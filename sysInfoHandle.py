import json

import tornado.web
from  tornado.escape import json_decode

import myUtil
from PlatformInfo import CPU, Memory, Disk, Network, get_platform_info, get_adaptable_unit, unit_convector


class ChartGenerator(object):
    def __check_attr(self, attr):
        if hasattr(self, "_" + attr + "_"):
            return self.__getattribute__("_" + attr + "_")
        raise AttributeError(("There is no such attribute: %s in this class%s.\n" +
                              "Please use set_%s to initialize the attribute.") % (attr, self.__class__.__name__, attr))

    def get_json_obj(self):
        ret = dict()
        ret["identifier"] = self.__check_attr("chartId")
        ret["chartId"] = "chart" + self.__check_attr("chartId")
        ret["dataType"] = self.__check_attr("chartTitle")
        ret["chartType"] = self.__check_attr("chartType")
        ret["chartTitle"] = {'text': self.__check_attr("chartTitle"), 'halign': 'plotAreaCenter'}
        ret["otherInfo"] = self.__check_attr("other_info")
        try:
            option = self.__check_attr("option")
        except AttributeError:
            option = []
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
        for key in option:
            if key != "lineType" and key != "myGroups" and key != "seriesNames":
                ret[key] = option[key]
        return json.dumps(ret)


myUtil.__setter_and_getter__(ChartGenerator, ["chartType", "chartTitle", "data", "chartId", "option", "other_info"])


class ChartHandle():
    @staticmethod
    def get_response(require_json):
        if "chart" in require_json:
            ret = []
            if "cpu" in require_json["chart"]:
                mem_chart = ChartGenerator()
                mem_chart.set_chartId("cpu")
                mem_chart.set_chartTitle("CPU Usage")
                mem_chart.set_chartType("line")
                my_option = dict()
                my_option["showAndHide"] = "withRescale"
                my_option["myGroups"] = list(range(60, 0, -1))
                cpu_info = CPU.get_info()
                other_info = """
                <table id="cpu_info" border="1" align="center" width="100%%">
                  <tr>
                    <td>CPU Model</td>
                    <td>%s</td>
                  </tr>
                  <tr>
                    <td>Physical Cores</td>
                    <td>%d</td>
                  </tr>
                  <tr>
                    <td>Logical Cores</td>
                    <td>%d</td>
                  </tr>
                </table>
                """
                other_info = other_info % (cpu_info["name"], cpu_info["physicalCore"], cpu_info["logicalCore"])
                mem_chart.set_other_info(other_info)
                my_data = list()
                my_data.append([0])
                my_option["lineType"] = "curved"
                my_option["seriesNames"] = ["CPU Average"]
                for i in range(cpu_info["logicalCore"]):
                    my_data.append([0])
                    my_option["seriesNames"].append("CPU_%d Usage" % i)
                mem_chart.set_option(my_option)
                mem_chart.set_data(my_data)
                ret.append(mem_chart.get_json_obj())
            if "disk" in require_json["chart"]:
                disk_info = Disk.get_disk("M")
                for disk in disk_info:
                    mem_chart = ChartGenerator()
                    mem_chart.set_chartId("disk" + str(disk_info.index(disk)))
                    mem_chart.set_chartType("pie")
                    disk_total = get_adaptable_unit(disk["total"])
                    unit = disk_total[1]
                    mem_chart.set_chartTitle(disk["device"] + "  %.2f" % disk_total[0] + disk_total[1])
                    other_info = """
                    <table border="1" align="center" width="100%%">
                      <tr>
                        <td>Disk Device</td>
                        <td>%s</td>
                      </tr>
                      <tr>
                        <td>Volume</td>
                        <td>%.3f%s</td>
                      </tr>
                      <tr>
                        <td>File System</td>
                        <td>%s</td>
                      </tr>
                      <tr>
                        <td>Mount Point</td>
                        <td>%s</td>
                      </tr>
                    </table>
                    """
                    other_info = other_info % (disk["device"], disk_total[0], disk_total[1],
                                               disk["fstype"], disk["mountpoint"])
                    mem_chart.set_other_info(other_info)
                    my_option = dict()
                    my_option["seriesNames"] = ["free (%s)" % unit, "used (%s)" % unit]
                    disk_free = unit_convector(disk["free"], "MB", unit)
                    disk_used = unit_convector(disk["used"], "MB", unit)
                    my_data = [[disk_free], [disk_used]]
                    mem_chart.set_data(my_data)
                    mem_chart.set_option(my_option)
                    ret.append(mem_chart.get_json_obj())
            if "mem" in require_json["chart"]:
                mem_info = Memory.get_mem_info("M")
                swap_info = Memory.get_swap_info("M")
                mem_chart = ChartGenerator()
                mem_chart.set_chartId("memory")
                mem_chart.set_chartType("bar")
                mem_total = get_adaptable_unit(mem_info["total"])
                unit = mem_total[1]
                mem_chart.set_chartTitle("Memory Usage")
                mem_free = unit_convector(mem_info["free"], "MB", unit)
                mem_used = unit_convector(mem_info["used"], "MB", unit)
                swap_free = unit_convector(swap_info["free"], "MB", unit)
                swap_used = unit_convector(swap_info["used"], "MB", unit)
                my_data = [[mem_used, swap_used], [mem_free, swap_free]]
                other_info = """
                <table border="1" align="center" width="100%%">
                  <tr>
                    <td>Memory total</td>
                    <td>%.3f%s</td>
                  </tr>
                  <tr>
                    <td>Memory available</td>
                    <td>%.3f%s</td>
                  </tr>
                  <tr>
                    <td>Memory free</td>
                    <td>%.3f%s</td>
                  </tr>
                  <tr>
                    <td>Memory used</td>
                    <td>%.3f%s</td>
                  </tr>
                </table>
                """
                mem_chart.set_other_info(other_info % (mem_total[0], unit,
                                                       unit_convector(mem_info["available"], "MB", unit), unit,
                                                       mem_free, unit,
                                                       mem_used, unit))
                my_option = dict()
                my_option["seriesNames"] = ["used (%s)" % unit, "free (%s)" % unit]
                my_option["myGroups"] = ["Memory", "Swap"]
                my_option["orientationValue"] = "horizontal"
                my_option["stackValue"] = "on"
                mem_chart.set_data(my_data)
                mem_chart.set_option(my_option)
                ret.append(mem_chart.get_json_obj())
            return "[" + ",".join(ret) + "]"
            # return json.dumps(ret)


class SysInfoHandler(tornado.web.RequestHandler):
    def get(self):
        example_response = dict()
        example_response['name'] = 'example'
        example_response['width'] = 1020
        print(self.get_argument("a"))
        self.write(json.dumps(example_response))

    def post(self):
        json_obj = json_decode(self.request.body)
        if "chart" in json_obj:
            ret = ChartHandle.get_response(json_obj)
            self.write(ret)
            return
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
