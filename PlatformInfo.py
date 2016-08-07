import platform
import threading
import time

import psutil


def obj2dict(f):
    return dict(f._asdict())


class CPU(object):
    @staticmethod
    def get_info():
        cpu_info = {"name": platform.processor()}
        cpu_info["physicalCore"] = psutil.cpu_count(False)
        cpu_info["logicalCore"] = psutil.cpu_count()
        return cpu_info

    @staticmethod
    def get_status():
        t0 = time.time()
        ret = dict()

        def percent(ret):
            ret["cpupercent"] = psutil.cpu_percent(interval=0.49, percpu=True)

        def times(ret):
            cputimes = psutil.cpu_times_percent(interval=0.49, percpu=True)
            ret["cputimes"] = []
            for i in cputimes:
                ret["cputimes"].append(obj2dict(i))

        threads = []
        threads.append(threading.Thread(target=percent, daemon=True, args=(ret,)))
        threads.append(threading.Thread(target=times, daemon=True, args=(ret,)))
        for i in threads:
            i.start()
            i.join()
        ret["status"] = obj2dict(psutil.cpu_stats())
        return ret


def get_platform_info():
    ret = obj2dict(platform.uname())
    ret["runningTime"] = (time.time() - psutil.boot_time())
    return ret


def M(val):
    return val / 1048576.


def K(val):
    return val / 1024.


def G(val):
    return val / 1073741824.


def T(val):
    return val / 1099511627776.


class Memory(object):
    @staticmethod
    def get_mem_info(u="M"):
        unit = M
        if u == "K" or u == "k":
            unit = K
        if u == "G" or u == "g":
            unit = G
        if u == "T" or u == "t":
            unit = T
        vmem = psutil.virtual_memory()
        total = vmem.total
        available = vmem.available
        percent = vmem.percent
        used = vmem.used
        free = vmem.free
        memInfo = dict()
        memInfo["total"] = unit(total)
        memInfo["available"] = unit(available)
        memInfo["percent"] = percent
        memInfo["used"] = unit(used)
        memInfo["free"] = unit(free)
        return memInfo

    @staticmethod
    def get_swap_info(u="M"):
        unit = M
        if u == "K" or u == "k":
            unit = K
        if u == "G" or u == "g":
            unit = G
        if u == "T" or u == "t":
            unit = T
        vmem = psutil.swap_memory()
        total = vmem.total
        percent = vmem.percent
        used = vmem.used
        free = vmem.free
        memInfo = dict()
        memInfo["total"] = unit(total)
        memInfo["percent"] = percent
        memInfo["used"] = unit(used)
        memInfo["free"] = unit(free)
        return memInfo


class Disk(object):
    @staticmethod
    def get_disk(u="M"):
        unit = M
        if u == "K" or u == "k":
            unit = K
        if u == "G" or u == "g":
            unit = G
        if u == "T" or u == "t":
            unit = T
        all_disk_info = []
        all_disk = psutil.disk_partitions()
        for d in all_disk:
            this_disk = obj2dict(d)
            thisUsage = psutil.disk_usage(d.device)
            this_disk["total"] = unit(thisUsage.total)
            this_disk["used"] = unit(thisUsage.used)
            this_disk["free"] = unit(thisUsage.free)
            this_disk["percent"] = thisUsage.percent
            all_disk_info.append(this_disk)
        return all_disk_info

    @staticmethod
    def get_io():
        io = psutil.disk_io_counters(perdisk=True)
        for i in io:
            this_io = io[i]
            io[i] = obj2dict(this_io)
        return io


class Network(object):
    @staticmethod
    def get_if():
        io = psutil.net_io_counters(pernic=True)
        IF = psutil.net_if_stats()
        if_info = dict()
        for i in io:
            info = obj2dict(io[i])
            if i in IF:
                info.update(obj2dict(IF[i]))
            if_info[i] = info
        return if_info

    @staticmethod
    def get_addrs():
        if_addrs = psutil.net_if_addrs()
        for i in if_addrs:
            new_list = []
            for j in if_addrs[i]:
                new_list.append(obj2dict(j))
            if_addrs[i] = new_list
        return if_addrs


def get_adaptable_unit(val):
    """
    :param val: a volume of storage or memory with a unit MB (mega Bytes)
    :return: a tuple (double: new val, string: unit)
    """
    large_unit = ["MB", "GB", "TB"]
    small_unit = ["MB", "KB", "B"]
    step = 1.
    if val < 1000:
        unit = small_unit
        step = 1 / 1024.
    else:
        unit = large_unit
        step = 1024.
    for u in unit:
        if val < 1000:
            return val, u
        val = val / step


def unit_convector(val, unit, target_unit):
    convector = {"B": 1, "KB": 1024, "MB": 1048576, "GB": 1073741824, "TB": 1099511627776}
    return val * convector[unit] / convector[target_unit]
