define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojgauge'],
    function (ko, oj, data) {
        function getSysInfo() {
            var self = this;
            $.ajax({
                url: '/sysinfo',
                data: JSON.stringify({"chart": ["cpu", "disk", "mem"]}),
                cache: false,
                async: false,
                type: "POST",
                dataType: 'json',
                success: function (result) {
                    self.result = result;
                }
            });
            return self.result;
        }

        var sysinfo = getSysInfo();
        console.log(sysinfo);


        function updateCPUValue(sIndex, val) {
            var cpu = $("#chartcpu");
            if(cpu.length>0){
                var series = cpu.ojChart("option", "series");
                if (sIndex < 0 || sIndex >= series.length) {
                    return null;
                }
                if (typeof val !== 'undefined') {
                    if (series[sIndex].items.length >= 60) {
                        series[sIndex].items.shift();
                    }
                    series[sIndex].items.push(val);
                }
                return series;
            }

        }

        function updateMemValue(memFree, memUsed, swapFree, swapUsed) {
            var mem = $("#chartmemory");
            var series = mem.ojChart("option", "series");
            if(typeof series !== "undefined") {
                var name = series[0].name;
                var step = 1.;
                if (name.indexOf("GB") >= 0) {
                    step = 1 / 1024;
                }
                if (name.indexOf("TB") >= 0) {
                    step = 1 / 1024 / 1024;
                }
                if (name.indexOf("KB") >= 0) {
                    step = 1024;
                }
                for (var i = 0; i < series.length; i++) {
                    if (series[i].name.indexOf("free") >= 0) {
                        series[i].items = [memFree * step, swapFree * step];
                    }
                    if (series[i].name.indexOf("used") >= 0) {
                        series[i].items = [memUsed * step, swapUsed * step];
                    }
                }
                return series;
            }
        }

        function ChartModel() {
            var self = this;
            for (var chartInfo in sysinfo) {
                if (!("myGroups" in sysinfo[chartInfo])) {
                    sysinfo[chartInfo].myGroups = [];
                }
                if (!("otherInfo" in sysinfo[chartInfo])) {
                    sysinfo[chartInfo].otherInfo = "";
                }
                if (!("showAndHide" in sysinfo[chartInfo])) {
                    sysinfo[chartInfo].showAndHide = "none";
                }
                if (!("orientationValue" in sysinfo[chartInfo])) {
                    sysinfo[chartInfo].orientationValue = "vertical";
                }
                if (!("stackValue" in sysinfo[chartInfo])) {
                    sysinfo[chartInfo].stackValue = "off";
                }

                function updateCPU() {
                    var selector = $("#chartcpu");
                    if (selector.length > 0) {
                        $.ajax(
                            {
                                url: '/sysinfo',
                                type: 'POST',
                                data: JSON.stringify({"require": ["CPU.status"]}),
                                success: function (jsonResponse) {
                                    var cpu = JSON.parse(jsonResponse).CPU;
                                    if (cpu) {
                                        var selector = $("#chartcpu");
                                        var series = selector.ojChart("option", "series");
                                        var avg = 0;
                                        for (var i = 1; i < series.length; i++) {
                                            updateCPUValue(i, cpu.status.cpupercent[i - 1]);
                                            avg += cpu.status.cpupercent[i - 1];
                                        }
                                        updateCPUValue(0, avg / (series.length - 1));
                                        selector.ojChart("refresh");
                                    }
                                }
                            });
                    }
                    else{
                        clearInterval(cpuUpdateId);
                    }
                }

                function updateMem() {
                    var selector = $("#chartmemory");
                    if (selector.length > 0) {
                        $.ajax(
                            {
                                url: '/sysinfo',
                                type: 'POST',
                                data: JSON.stringify({"require": ["Mem.mem", "Mem.swap"]}),
                                success: function (jsonResponse) {
                                    var mem = JSON.parse(jsonResponse).Mem.mem;
                                    var swap = JSON.parse(jsonResponse).Mem.swap;
                                    if (mem && swap) {
                                        var series = selector.ojChart("option", "series");
                                        updateMemValue(mem.free, mem.used, swap.free, swap.used);

                                        selector.ojChart("refresh");
                                    }
                                }
                            });
                    }
                    else{
                        clearInterval(memUpdateId);
                    }
                }
            }
            self.sysinfo = ko.observableArray(sysinfo);
            var cpuUpdateId= setInterval(updateCPU, 1000);
            var memUpdateId = setInterval(updateMem, 10000)
        }

        return ChartModel;
    });