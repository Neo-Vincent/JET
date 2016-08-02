	requirejs.config({
// Path mappings for the logical module names
    paths: 
    //injector:mainReleasePaths
     {
        'knockout': 'libs/knockout/knockout-3.4.0',
        'knockout-amd-helpers': 'libs/knockout/knockout-amd-helpers.min',
        'jquery': 'libs/jquery/jquery-2.1.3.min',
        'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.11.4.min',
        'promise': 'libs/es6-promise/promise-1.0.0.min',
        'ojs': 'libs/oj/v2.0.1/min',
        'ojL10n': 'libs/oj/v2.0.1/ojL10n',
        'ojtranslations': 'libs/oj/v2.0.1/resources',
        'signals': 'libs/js-signals/signals.min',
        'text': 'libs/require/text',
        'hammerjs': 'libs/hammer/hammer-2.0.4.min',
        'moment': 'libs/moment/moment.min',
        'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min'
    }
    //endinjector
    ,
    // Shim configurations for modules that do not expose AMD
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        },
        'maps': {
            deps: ['jquery', 'i18n'],
            exports: ['MVMapView']
        }
    },
    // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
    // resources with a custom translation file.
    // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
    // a path that is relative to the location of this main.js file.
    config: {
        ojL10n: {
            merge: {
                //'ojtranslations/nls/ojtranslations': 'resources/nls/menu'
            }
        }
    }
});


require(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart'],
function(oj, ko, $)
{   
    function ChartModel() {
        var self = this;

        /* toggle button variables */
        self.orientationValue = ko.observable('vertical');
        
        /* chart data */
        self.items =  [3,  2,  3,  3,  2];
        function getItems(val){
            if(typeof val !== 'undefined'){
                if (self.items.length > 10) {
                    self.items.shift();
                }
                self.items.push(val);
            }
            return self.items;
        }
        var lineSeries = [{name : "Series 1", items : getItems() }];
    
        var lineGroups = ["Group A"];


        
        this.lineSeriesValue = ko.observableArray(lineSeries);
        this.lineGroupsValue = ko.observableArray(lineGroups);


        self.updateButtonClick = function(data, event) {
            var lineSeries = [{name : "Series 1", items : getItems() }];
            self.lineSeriesValue(lineSeries);
            return true;
        };

        function getValue() {
            $.ajax(
                {
                    url: '/test/',
                    type: 'POST',
                    data: JSON.stringify({"require":true}),
                    success: function (jsonResponse) {
                        var objresponse = JSON.parse(jsonResponse);
                        var lineSeries = [{name : "Series 1", items : getItems(objresponse["new"]) }];
                        self.lineSeriesValue(lineSeries);
                        console.log(objresponse);
                    }
                });
        }

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
        window.setInterval(getSysInfo,1000);
        /* toggle buttons*/
        self.orientationOptions = [
            {id: 'vertical', label: 'vertical', value: 'vertical', icon: 'oj-icon demo-line-vert'},
            {id: 'horizontal', label: 'horizontal', value: 'horizontal', icon: 'oj-icon demo-line-horiz'}
        ];
    }
    
    var chartModel = new ChartModel();
    
    $(document).ready(
	function(){
            ko.applyBindings(chartModel, document.getElementById('chart-container'));
	}
    );
});	