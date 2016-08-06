from PlatformInfo import CPU, Memory, Disk, Network, get_platform_info
import tornado.web
import json
from  tornado.escape import json_decode
import numpy as np
import random
import myUtil


class ChartGenerator(object):
    def __check_attr(self, attr):
        if hasattr(self, "_" + attr + "_"):
            return self.__getattribute__("_" + attr + "_")
        raise AttributeError(("There is no such attribute: %s in this class%s.\n" +
                              "Please use set_%s to initialize the attribute.") % (attr, self.__class__.__name__, attr))

    def get_json_obj(self):
        ret = dict()
        ret["identifier"] = self.__check_attr("chartId")
        ret["dataType"] = self.__check_attr("chartTitle")
        ret["chartType"] = self.__check_attr("chartType")
        ret["chartTitle"] = {'text': self.__check_attr("chartTitle"), 'halign': 'plotAreaCenter'}
        try:
            option = self.__check_attr("option")
        except AttributeError:
            option=[]
        data = self.__check_attr("data")
        if "seriesNames" in option:
            series_names = option["seriesNames"]
        else:
            series_names = ["series %d" % i for i in range(len(data))]
        ret["mySeries"] = [{"name": sName, "items": item} for sName, item in zip(series_names, data)]
        if "lineType" in option:
            for i in range(len(ret["mySeries"])):
                ret["mySeries"][i]["lineType"] = option["lineType"]
        if "myGroups" in option:
            ret["myGroups"] = option["myGroups"]
        return json.dumps(ret)
myUtil.__setter_and_getter__(ChartGenerator, ["chartType", "chartTitle", "data", "chartId", "option"])


class SysInfoHandler(tornado.web.RequestHandler):
    def get(self):
        example_response = dict()
        example_response['name'] = 'example'
        example_response['width'] = 1020
        print(self.get_argument("a"))
        self.write(json.dumps(example_response))

    def post(self):
        json_obj = json_decode(self.request.body)
        ret = dict()
        if "require" in json_obj:
            for i in json_obj["require"]:
                if i == "CPU.info":
                    if "CPU" not in ret:
                        ret["CPU"] = dict()
                    ret["CPU"]["info"] = CPU.get_info()
                if i == "CPU.status":
                    if "CPU" not in ret:
                        ret["CPU"] = dict()
                    ret["CPU"]["status"] = CPU.get_status()
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
            return

        if "chart" in json_obj:
            newChart=ChartGenerator()
            if "cpu" in json_obj["chart"]:
                newChart.set_chartId("cpu")
                newChart.set_chartTitle("CPU Usage")
                newChart.set_chartType("line")
                newChart.set_data([[5,4,3,4,5,6],[0,1,2,3,4,5]])
                myOption=dict()
                myOption["myGroups"]=list(range(60,0,-1))
                self.write(newChart.get_json_obj())
                return
            if "disk" in json_obj["chart"]:
                newChart.set_chartId("cpu")
                newChart.set_chartTitle("CPU Usage")
                newChart.set_chartType("pie")
                newChart.set_data([[5, 4, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5]])
                myOption = dict()
                myOption["myGroups"] = list(range(60, 0, -1))
                self.write(newChart.get_json_obj())
                return
