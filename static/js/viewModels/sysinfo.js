/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojgauge'],
    function (ko, oj, data)
    {
        function ChartModel() {
            //global section
            function getSysInfo() {
                $.ajax(
                    {
                        url: '/sysinfo',
                        type: 'POST',
                        data: JSON.stringify({"require":["CPU.info","CPU.status","Disk.info","Disk.status",
                            "Mem.mem","Mem.swap","Platform.info","Network.addrs","Network.if"]}),
                        success: function (jsonResponse) {
                            var objresponse = JSON.parse(jsonResponse);
                            console.log(objresponse);
                        }
                    });
            }
            //temporary function
            function error(){
                console.log("Error!");
            }
            var self = this;
            
            //CPU Section
            self.CPUdata= [];
            self.CPUseries=[];
            self.CPUxaxis=[];
            function addCPUSeries(series, name){
                self.CPUdata.push(series);
                self.CPUseries.push({name:name, items:self.CPUdata[self.CPUdata.length-1], lineType:"curved"});
            }
            function updateCPUValue(sIndex, val){
                if(sIndex<0 || sIndex>self.CPUdata.length){
                    error();
                    return null;
                }
                if(typeof val !== 'undefined'){
                    if (self.CPUdata[sIndex].length >= 60) {
                        self.CPUdata[sIndex].shift();
                    }

                    self.CPUdata[sIndex].push(val);

                }
                return self.CPUdata;
            }
            for(var i=0; i<60; i++){
                self.CPUxaxis.push(60-i);
            }
            this.CPUSeriesValue = ko.observableArray(self.CPUseries);
            this.CPUGroupsValue = ko.observableArray(self.CPUxaxis);
            function CPUinit(){
                $.ajax(
                    {
                        url: '/sysinfo',
                        type: 'POST',
                        data: JSON.stringify({"require":["CPU.info"]}),
                        success: function (jsonResponse) {
                            var cpu = JSON.parse(jsonResponse).CPU;
                            if(cpu){
                                console.log(cpu);
                                for(var i=0; i< cpu.info.logicalCore; i++){
                                    addCPUSeries([],"CPU"+i);
                                }
                                addCPUSeries([],"CPU");
                                self.CPUSeriesValue(self.CPUseries);
                                self.CPUGroupsValue(self.CPUxaxis);
                            }
                        }
                    });
            }
            CPUinit();
            function getCpuStatus() {
                $.ajax(
                    {
                        url: '/sysinfo',
                        type: 'POST',
                        data: JSON.stringify({"require":["CPU.status"]}),
                        success: function (jsonResponse) {
                            var cpu = JSON.parse(jsonResponse).CPU;
                            if(cpu){
                                var avg=0;
                                for(var i=0; i<self.data.length-1; i++){
                                    updateValue(i, cpu.status.cpupercent[i]);
                                    avg+=cpu.status.cpupercent[i];
                                }
                                updateValue(self.CPUdata.length-1, avg/self.CPUdata.length-1);
                                //updateGroup(cpu.status.cpupercent[0]);
                                self.CPUSeriesValue(self.CPUseries);
                            }
                        }
                    });
            }

            //Disk Section
            self.diskInfo=[];
            self.allDiskUsage = [];
            this.diskUsage = ko.observableArray(self.allDiskUsage);
            this.diskTitle = ko.observable("Disk Usage: Total 0");
            var converterFactory = oj.Validation.converterFactory("number");
            var options = {pattern: '#,##0%'};
            var converter = converterFactory.createConverter(options);
            this.converter = ko.observable(converter);
            function getDiskInfo() {
                $.ajax(
                    {
                        url: '/sysinfo',
                        type: 'POST',
                        data: JSON.stringify({"require":["Disk.info"]}),
                        success: function (jsonResponse) {
                            var disk = JSON.parse(jsonResponse).Disk;
                            if(disk){
                                var total=0;
                                var free=0;
                                var used=0;
                                for(var i=0; i<disk.info.length;i++){
                                    total+=disk.info[i].total;
                                    free+=disk.info[i].free*1024*1024;
                                    used+=disk.info[i].used*1024*1024;
                                }
                                self.allDiskUsage.push({name:"used",items:[used]});
                                self.allDiskUsage.push({name:"free",items:[free]});
                                //self.diskTitle("Disk Usage: Total " +total);
                                self.diskUsage = ko.observableArray(self.allDiskUsage);
                                $("#diskChart").ojChart('option',"title.text", "Disk Usage: Total " +total/1024+"GB");
                                $("#diskChart").ojChart("refresh");
                            }
                        }
                    });
            }
            getDiskInfo();
         // window.setInterval(getDiskInfo,1000);

        }
        return ChartModel;
    });
