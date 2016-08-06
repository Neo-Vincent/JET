define(['knockout', 'ojs/ojcore', 'data/data', 'ojs/ojknockout', 'ojs/ojmasonrylayout', 'ojs/ojchart', 'ojs/ojgauge'],
    function (ko, oj, data) {
        function getCPU() {
            var self = this;
            $.ajax({
                url: '/sysinfo',
                data: JSON.stringify({"chart": ["cpu"]}),
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

        var sysinfo = getCPU();

        function addChart(chartInfo) {
            var koKey = ["identifier", "dataType", "chartType",
                "chartTitle", "otherInfo"]
        }

        function ChartModel() {
            var self = this;
            console.log(sysinfo);

            if (!("myGroups" in sysinfo)) {
                sysinfo.myGroups = [];
            }
            if (!("otherInfo" in sysinfo)) {
                sysinfo.otherInfo = "";
            }

            self.sysinfo = ko.observableArray([sysinfo, sysinfo, sysinfo]);

        }

        return ChartModel;
    });