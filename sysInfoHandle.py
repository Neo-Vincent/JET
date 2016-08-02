from PlatformInfo import CPU,Memory,Disk,Network,get_platform_info
import tornado.web
import json
from  tornado.escape import json_decode
import random

class SysInfoHandler(tornado.web.RequestHandler):
    def get(self):
        example_response = {}
        example_response['name'] = 'example'
        example_response['width'] = 1020
        print(self.get_argument("a"))
        self.write(json.dumps(example_response))


    def post(self):
        json_obj = json_decode(self.request.body)
        ret = dict()
        import time
        t0=time.time()
        if len(json_obj["require"]) > 0:
            for i in json_obj["require"]:
                if i == "CPU.info":
                    if "CPU" not in ret:
                        ret["CPU"]=dict()
                    ret["CPU"]["info"]=CPU.get_info()
                if i == "CPU.status":
                    if "CPU" not in ret:
                        ret["CPU"] = dict()
                    ret["CPU"]["status"] =CPU.get_status()
                if i == "Disk.info":
                    if "Disk" not in ret:
                        ret["Disk"] = dict()
                    ret["Disk"]["info"] = Disk.get_disk()
                if i == "Disk.status":
                    if "Disk" not in ret:
                        ret["Disk"] = dict()
                    ret["Disk"]["status"] = Disk.get_io()
                if i == "Mem.mem":
                    if "Mem" not in ret:
                        ret["Mem"] = dict()
                    ret["Mem"]["mem"] = Memory.get_mem_info()
                if i == "Mem.swap":
                    if "Mem" not in ret:
                        ret["Mem"] = dict()
                    ret["Mem"]["swap"] = Memory.get_swap_info()
                if i == "Platform.info":
                    if "Platform" not in ret:
                        ret["Platform"] = dict()
                    ret["Platform"]["info"] = get_platform_info()
                if i == "Network.addrs":
                    if "Network" not in ret:
                        ret["Network"] = dict()
                    ret["Network"]["addrs"] = Network.get_addrs()
                if i == "Network.if":
                    if "Network" not in ret:
                        ret["Network"] = dict()
                    ret["Network"]["if"] = Network.get_if()
        self.write(json.dumps(ret))

