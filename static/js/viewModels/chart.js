/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojgauge'],
    function (ko, oj, data)
    {

        function chartBase(id,dataType,chartType,chartTitle){
            var self=this;
            self.identifier=id;
            self.dataType=dataType;
            self.chartType=chartType;
            self.chartTitle=chartTitle;
            var converterFactory = oj.Validation.converterFactory("number");
            var converter = converterFactory.createConverter({pattern: '#,##GB'});
            this.converter = ko.observable(converter);
        }
        function mychart(id,dataType,chartType,chartTitle){
                chartBase.call(this,id,dataType,chartType,chartTitle);
        }
        mychart.prototype = new chartBase();
        mychart.prototype.constructor = myChart;


        function ChartModel() {
            var self = this;
            self.sysInfo=[];
        }
        return ChartModel;
    });