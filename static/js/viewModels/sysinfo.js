/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojgauge'],
    function (ko, oj, data)
    {
        function ChartModel() {
            var self = this;
            self.orientationValue = ko.observable('vertical');

            function addSeries(series, name){
                self.data.push(series);
                self.series.push({name:name, items:self.data[self.data.length-1], lineType:"curved"});
            }
            //temporary function
            function error(){
                console.log("Error!");
            }
            /*function updateGroup(val){
                if(typeof val !== 'undefined'){
                    if (self.xaxis.length > 60) {
                        self.xaxis.shift();
                    }
                    var date= new Date();
                    if(self.xaxis[-1]-date.getTime() <10){
                        return;
                    }
                    self.xaxis.push(date.getTime());
                }
            }*/
            function updateValue(sIndex, val){
                if(sIndex<0 || sIndex>self.data.length){
                    error();
                    return null;
                }
                if(typeof val !== 'undefined'){
                    if (self.data[sIndex].length >= 60) {
                        self.data[sIndex].shift();
                    }

                    self.data[sIndex].push(val);

                }
                return self.data;
            }

            self.data= [];
            self.series=[];
            self.xaxis=[];
            for(var i=0; i<60; i++){
                self.xaxis.push(60-i);
            }
            this.SeriesValue = ko.observableArray(self.series);
            this.GroupsValue = ko.observableArray(self.xaxis);

            
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

            function init(){
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
                                    addSeries([],"CPU"+i);
                                }
                                addSeries([],"CPU");
                                self.SeriesValue(self.series);
                                self.GroupsValue(self.xaxis);
                                console.log(self.data);
                            }
                        }
                    });
            }
            init();
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
                                updateValue(self.data.length-1, avg/self.data.length-1);
                                //updateGroup(cpu.status.cpupercent[0]);
                                self.SeriesValue(self.series);
                            }
                        }
                    });
            }
           window.setInterval(getCpuStatus,1000);

        }
        return ChartModel;
    });
