# encoding UTF-8
import http.client as httplib
import socket
import time
import urllib.parse
import urllib.request
import xml.dom.minidom as dom

email = "XXXXXXXXXXXXXXX"
password = "*************"

authorization = {"login_email": email, "login_password": password,}

url = r'https://dnsapi.cn/Record.List'
record_url = r'https://dnsapi.cn/Record.List'
domain_url = r'https://dnsapi.cn/Domain.List'
api_url = r"http://dnsapi.cn"


def post_method(url, postdata, code='utf-8', header=None):
    if header is None:
        header = {'POST': '', "Content-type": "application/x-www-form-urlencoded", "Accept": "text/json"}
    postdata = urllib.parse.urlencode(postdata)
    postdata = postdata.encode(code)
    req = urllib.request.Request(url, data=postdata, headers=header)
    res = urllib.request.urlopen(req)
    scode = res.read().decode(code, 'ignore')
    return res, scode


def get_record_id(domain_id, record):
    params = {"domain_id": domain_id}
    params.update(authorization)
    res, scode = post_method(record_url, params)
    myDom = dom.parseString(scode)
    items = myDom.getElementsByTagName("dnspod")[0].getElementsByTagName("records")[0].getElementsByTagName("item")
    for item in items:
        record_name = item.getElementsByTagName("name")[0].firstChild.data
        if record_name == record:
            return item.getElementsByTagName("id")[0].firstChild.data

    return -1


def get_domain_id(domain):
    res, scode = post_method(domain_url, authorization)
    myDom = dom.parseString(scode)
    items = myDom.getElementsByTagName("dnspod")[0].getElementsByTagName("domains")[0].getElementsByTagName("item")
    for item in items:
        domain_name = item.getElementsByTagName("name")[0].firstChild.data
        if domain_name == domain:
            return item.getElementsByTagName("id")[0].firstChild.data
    return -1


def ddns(my_domain, ip, code="utf-8"):
    params = dict(
        format="json",
        record_line="默认",
        value=ip,
    )
    params.update(authorization)
    field = my_domain.split(".")
    sub_domain = ".".join(field[:-2])
    main_domain = ".".join(field[-2:])
    domain_id = get_domain_id(main_domain)
    record_id = get_record_id(domain_id, sub_domain)
    params.update({"domain_id": domain_id, "record_id": record_id, "sub_domain": sub_domain})
    headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/json"}
    conn = httplib.HTTPSConnection("dnsapi.cn")

    postdata = urllib.parse.urlencode(params)
    postdata = postdata.encode(code)
    conn.request("POST", "/Record.Ddns", postdata, headers)
    response = conn.getresponse()
    print(response.status, response.reason)
    data = response.read()
    print(data)
    conn.close()
    return response.status == 200


def getip():
    sock = socket.create_connection(('ns1.dnspod.net', 6666))
    ip = sock.recv(16)
    sock.close()
    return ip


if __name__ == '__main__':
    current_ip = None
    while True:
        try:
            ip = getip()
            print(ip)
            if current_ip != ip:
                if ddns("pi.neovincent.com", ip):
                    current_ip = ip
        except Exception as e:
            print(e)
            pass
        time.sleep(30)
