define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojgauge'],
    function (ko, oj, data) {
        function getSysInfo() {
            var self = this;
            $.ajax({
                url: '/sysinfo',
                data: JSON.stringify({"chart": ["cpu","disk"]}),
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


        function updateCPUValue(sIndex, val){
            var cpu=$("#chartcpu");
            var series=cpu.ojChart("option","series");
            if(sIndex<0 || sIndex> series.length){
                return null;
            }
            if(typeof val !== 'undefined'){
                if (series[sIndex].items.length >= 60) {
                    series[sIndex].items.shift();
                }
                series[sIndex].items.push(val);
            }
            return series;
        }


        function ChartModel() {
            var self = this;
            for(var chartInfo in sysinfo){
                if (!("myGroups" in sysinfo[chartInfo])) {
                    sysinfo[chartInfo].myGroups = [];
                }
                if (!("otherInfo" in sysinfo[chartInfo])) {
                    sysinfo[chartInfo].otherInfo = "";
                }
                if(!("showAndHide" in sysinfo[chartInfo])){
                    sysinfo[chartInfo].showAndHide="none";
                }
                function updateCPU() {
                    $.ajax(
                        {
                            url: '/sysinfo',
                            type: 'POST',
                            data: JSON.stringify({"require":["CPU.status"]}),
                            success: function (jsonResponse) {
                                var cpu = JSON.parse(jsonResponse).CPU;
                                if(cpu){
                                    var selector=$("#chartcpu");
                                    var series=selector.ojChart("option","series");
                                    var avg=0;
                                    for(var i=1; i<series.length; i++){
                                        updateCPUValue(i, cpu.status.cpupercent[i-1]);
                                        avg+=cpu.status.cpupercent[i-1];
                                    }
                                    updateCPUValue(0, avg/(series.length-1));
                                    selector.ojChart("refresh");
                                }
                            }
                        });
                }
            }
           self.sysinfo = ko.observableArray(sysinfo);
            setInterval(updateCPU,1000)
        }

        return ChartModel;
    });