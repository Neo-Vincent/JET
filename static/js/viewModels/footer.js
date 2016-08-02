/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Footer module
 */
define(['ojs/ojcore' ,'knockout'
   ], function(oj, ko) {
   /**
    * The view model for the footer module
    */
            function FooterViewModel() {
                var self = this;

                var aboutme = 'http://www.neovincent.com/';


                self.ojVersion = ko.observable('v' + oj.version + ', rev: ' + oj.revision);

                self.footerLinks = ko.observableArray([
                    new FooterNavModel('About ME', 'aboutme', aboutme)
                ]);

            }

            function FooterNavModel(name, id, linkTarget) {

                this.name = name;
                this.linkId = id;
                this.linkTarget = linkTarget;
            }

   return FooterViewModel;
});
