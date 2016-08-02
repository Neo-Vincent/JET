/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 Copyright 2013 jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
 Copyright 2013 jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
*/
define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojpopupcore","jqueryui-amd/draggable","jqueryui-amd/mouse"],function(b,f){(function(){b.ya("oj.ojDialog",f.oj.baseComponent,{version:"1.0.0",widgetEventPrefix:"oj",options:{cancelBehavior:"icon",dragAffordance:"title-bar",initialVisibility:"hide",modality:"modal",position:{my:"center",at:"center",of:window,collision:"fit",Gsa:function(a){var b=f(this).css(a).offset().top;0>b&&f(this).css("top",a.top-b)}},resizeBehavior:"resizable",role:"dialog",
title:null,beforeClose:null,beforeOpen:null,close:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_ComponentCreate:function(){this._super();this.Fpa={display:this.element[0].style.display,width:this.element[0].style.width,height:this.element[0].style.height};this.Zo={parent:this.element.parent(),index:this.element.parent().children().index(this.element)};this.PO=this.element.attr("title");this.options.title=this.options.title||this.PO;this.Pba();this.element.show().removeAttr("title").addClass("oj-dialog-content oj-dialog-default-content").appendTo(this.Qb);
this.rz=!1;if(this.element.find(".oj-dialog").length){var a=this;this.element.find(".oj-dialog-header").each(function(b,c){var e=f(c);if(!e.closest(".oj-dialog-body").length)return a.zo=e,a.rz=!0,!1})}else this.zo=this.element.find(".oj-dialog-header"),this.zo.length&&(this.rz=!0);this.rz?(this.Eba(this.zo),this.zo.prependTo(this.Qb),"icon"===this.options.cancelBehavior&&(this.WA(this.zo),this.ky=this.zo.find(".oj-dialog-title"),this.ky.length&&this.ky.insertAfter(this.hp))):this.Oba();this.Qm=this.element.children(".oj-dialog-footer");
this.Dba(this.Qm);this.Qm.length&&(this.Qm.addClass("oj-helper-clearfix"),this.Qm.appendTo(this.Qb));"title-bar"===this.options.dragAffordance&&f.fn.draggable&&this.Ot();this.ao=!1},KQ:function(){"show"===this.options.initialVisibility&&this.open()},_destroy:function(){this.Zba&&window.clearTimeout(this.Zba);this.isOpen()&&this.Xp();this.cm&&(this.cm("instance")&&this.cm("destroy"),this.cm=null);this.Qm.length&&(this.Qm.removeClass("oj-helper-clearfix"),f("#"+this.wZ).replaceWith(this.Qm));this.eB();
if(this.rz){var a=this.Qb.find(".oj-dialog-header");a&&f("#"+this.xZ).replaceWith(a)}this.Y5&&(this.Y5.remove(),this.Y5=null);this.element.removeUniqueId().removeClass("oj-dialog-content oj-dialog-default-content").css(this.Fpa);this.Qb&&this.Qb.stop(!0,!0);this.element.unwrap();this.PO&&this.element.attr("title",this.PO);this.Rm&&(this.Rm.remove(),this.Rm=null);delete this.wj;delete this.ao;this._super()},widget:function(){return this.Qb},disable:f.noop,enable:f.noop,close:function(a){if(this.isOpen()&&
(!1!==this._trigger("beforeClose",a)||this.Zw)){this.ao=!1;this.bda=null;this.opener.filter(":focusable").focus().length||f(this.document[0].activeElement).blur();var d={};d[b.N.Qa.hf]=this.Qb;b.N.qe().close(d);this._trigger("close",a)}},isOpen:function(){return this.ao},open:function(a){if(!1!==this._trigger("beforeOpen",a)){if(!this.isOpen()){this.ao=!0;this.opener=f(this.document[0].activeElement);"resizable"===this.options.resizeBehavior&&this.YY();a="rtl"===this.dc();a=b.nc.Hg(this.options.position,
a);var d={};d[b.N.Qa.hf]=this.Qb;d[b.N.Qa.jv]=this.opener;d[b.N.Qa.nv]=a;d[b.N.Qa.$h]=this.options.modality;d[b.N.Qa.mp]=this.rt();d[b.N.Qa.$m]="oj-dialog-layer";d[b.N.Qa.Zm]=b.N.Zm.KF;b.N.qe().open(d);this._trigger("open")}this.LV()}},refresh:function(){this._super()},LV:function(){var a=this.bda;a&&0<a.length&&b.v.Po(this.Qb[0],a[0])||(a||(a=this.element.find("[autofocus]")),a.length||(a=this.element.find(":tabbable")),a.length||this.Qm.length&&(a=this.Qm.find(":tabbable")),a.length||this.tP&&(a=
this.tP.filter(":tabbable")),a.length||(a=this.Qb),a.eq(0).focus(),this._trigger("focus"))},_keepFocus:function(a){a.preventDefault();a=this.document[0].activeElement;this.Qb[0]===a||f.contains(this.Qb[0],a)||this.LV()},Je:function(a){return!isNaN(parseInt(a,10))},Pba:function(){this.BY=!1;this.element.uniqueId();this.BI=this.element.attr("id");this.Nma="ojDialogWrapper-"+this.BI;this.Qb=f("\x3cdiv\x3e");this.Qb.addClass("oj-dialog oj-component").hide().attr({tabIndex:-1,role:this.options.role,id:this.Nma});
this.Qb.insertBefore(this.element);this._on(this.Qb,{keyup:function(){},keydown:function(a){if("none"!=this.options.cancelBehavior&&!a.isDefaultPrevented()&&a.keyCode&&a.keyCode===f.ui.keyCode.ESCAPE)a.preventDefault(),a.stopImmediatePropagation(),this.close(a);else if(a.keyCode===f.ui.keyCode.TAB&&"modeless"!==this.options.modality){var b=this.Qb.find(":tabbable"),c=b.filter(":first"),e=b.filter(":last");a.shiftKey?a.shiftKey&&(a.target===c[0]||a.target===this.Qb[0]?(e.focus(),a.preventDefault()):
(c=b.index(document.activeElement),1==c&&b[0]&&(b[0].focus(),a.preventDefault()))):a.target===e[0]||a.target===this.Qb[0]?(c.focus(),a.preventDefault()):(c=b.index(document.activeElement),0==c&&b[1]&&(b[1].focus(),a.preventDefault()))}}});this.element.find("[aria-describedby]").length||this.Qb.attr({"aria-describedby":this.element.uniqueId().attr("id")})},eB:function(){this.hp&&(this.hp.remove(),this.tP=this.hp=null)},WA:function(a){this.hp=f("\x3cdiv\x3e").addClass("oj-dialog-header-close-wrapper").attr("tabindex",
"1").attr("aria-label","close").attr("role","button").appendTo(a);this.tP=f("\x3cspan\x3e").addClass("oj-component-icon oj-clickable-icon oj-dialog-close-icon").attr("alt","close icon").prependTo(this.hp);this._on(this.hp,{click:function(a){a.preventDefault();a.stopImmediatePropagation();this.close(a)},mousedown:function(a){f(a.currentTarget).addClass("oj-active")},mouseup:function(a){f(a.currentTarget).removeClass("oj-active")},mouseenter:function(a){f(a.currentTarget).addClass("oj-hover")},mouseleave:function(a){a=
a.currentTarget;f(a).removeClass("oj-hover");f(a).removeClass("oj-active")},keyup:function(a){if(a.keyCode&&a.keyCode===f.ui.keyCode.SPACE||a.keyCode===f.ui.keyCode.ENTER)a.preventDefault(),a.stopImmediatePropagation(),this.close(a)}})},Oba:function(){var a;this.Rm=f("\x3cdiv\x3e").addClass("oj-dialog-header oj-helper-clearfix").prependTo(this.Qb);this._on(this.Rm,{mousedown:function(a){f(a.target).closest(".oj-dialog-close-icon")||this.Qb.focus()}});"icon"===this.options.cancelBehavior&&this.WA(this.Rm);
a=f("\x3cspan\x3e").uniqueId().addClass("oj-dialog-title").appendTo(this.Rm);this.i1(a);this.Qb.attr({"aria-labelledby":a.attr("id")})},i1:function(a){this.options.title||a.html("\x26#160;");a.text(this.options.title)},Ot:function(){function a(a){return{position:a.position,offset:a.offset}}var b=this,c=this.options;this.Qb.draggable({Zra:!1,cancel:".oj-dialog-content, .oj-dialog-header-close",handle:".oj-dialog-header",containment:"document",start:function(c,g){f(this).addClass("oj-dialog-dragging");
b.uT();b._trigger("dragStart",c,a(g))},drag:function(c,f){b._trigger("drag",c,a(f))},stop:function(e,g){c.position=[g.position.left-b.document.scrollLeft(),g.position.top-b.document.scrollTop()];f(this).removeClass("oj-dialog-dragging");b.q1();b._trigger("dragStop",e,a(g))}});this.Qb.addClass("oj-draggable")},YY:function(){function a(a){return{originalPosition:a.Zo,originalSize:a.Qj,position:a.position,size:a.size}}var b=this;this.Qb.css("position");this.cm=this.Qb.ojResizable.bind(this.Qb);this.cm({cancel:".oj-dialog-content",
containment:"document",handles:"n,e,s,w,se,sw,ne,nw",start:function(c,e){b.BY=!0;f(this).addClass("oj-dialog-resizing");b.uT();b._trigger("resizeStart",c,a(e))},resize:function(c,e){b._trigger("resize",c,a(e))},stop:function(c,e){b.BY=!1;f(this).removeClass("oj-dialog-resizing");b.q1();b._trigger("resizeStop",c,a(e))}})},cL:function(){var a="rtl"===this.dc(),a=b.nc.Hg(this.options.position,a);this.Qb.position(a);this.yZ()},yZ:function(){b.N.qe().sP(this.Qb,b.N.Ac.bn)},_setOption:function(a,d,c){var e;
e=this.Qb;if("disabled"!==a)switch(this._super(a,d,c),a){case "dragAffordance":(a=e.hasClass("oj-draggable"))&&"none"===d&&(e.draggable("destroy"),this.Qb.removeClass("oj-draggable"));a||"title-bar"!==d||this.Ot();break;case "position":this.cL();break;case "resizeBehavior":e=!1;this.cm&&(e=!0);e&&"resizable"!=d&&(this.cm("instance")&&this.cm("destroy"),this.cm=null);e||"resizable"!==d||this.YY();break;case "title":this.i1(this.Rm.find(".oj-dialog-title"));break;case "role":e.attr("role",d);break;
case "modality":this.isOpen()&&(e={},e[b.N.Qa.hf]=this.Qb,e[b.N.Qa.$h]=d,b.N.qe().vu(e));break;case "cancelBehavior":"none"===d||"escape"===d?this.eB():"icon"===d&&(this.rz?(this.eB(),this.WA(this.zo),this.ky=this.zo.find(".oj-dialog-title"),this.ky.length&&this.ky.insertAfter(this.hp)):(this.eB(),this.WA(this.Rm),this.E5=this.Rm.find(".oj-dialog-title"),this.E5.length&&this.E5.insertAfter(this.hp)))}},uT:function(){this.aO=this.document.find("iframe").map(function(){var a=f(this),b=a.offset();return f("\x3cdiv\x3e").css({width:a.outerWidth(),
height:a.outerHeight()}).appendTo(a.parent()).offset(b)[0]})},q1:function(){this.aO&&(this.aO.remove(),delete this.aO)},Dba:function(a){this.wZ="ojDialogPlaceHolderFooter-"+this.BI;this.Iia=f("\x3cdiv\x3e").hide().attr({id:this.wZ});this.Iia.insertBefore(a)},Eba:function(a){this.xZ="ojDialogPlaceHolderHeader-"+this.BI;this.Jia=f("\x3cdiv\x3e").hide().attr({id:this.xZ});this.Jia.insertBefore(a)},getNodeBySubId:function(a){if(null==a)return this.element?this.element[0]:null;a=a.subId;switch(a){case "oj-dialog-header":case "oj-dialog-body":case "oj-dialog-footer":case "oj-dialog-content":case "oj-dialog-header-close-wrapper":case "oj-resizable-n":case "oj-resizable-e":case "oj-resizable-s":case "oj-resizable-w":case "oj-resizable-se":case "oj-resizable-sw":case "oj-resizable-ne":case "oj-resizable-nw":a=
"."+a;if(!this.widget().find(a))break;return this.widget().find(a)[0];case "oj-dialog-close-icon":case "oj-dialog-close":if(!this.widget().find(".oj-dialog-close-icon"))break;return this.widget().find(".oj-dialog-close-icon")[0]}return null},getSubIdByNode:function(a){if(null!=a){a=f(a);if(a.hasClass("oj-dialog-header"))return{subId:"oj-dialog-header"};if(a.hasClass("oj-dialog-footer"))return{subId:"oj-dialog-footer"};if(a.hasClass("oj-dialog-content"))return{subId:"oj-dialog-content"};if(a.hasClass("oj-dialog-header-close-wrapper"))return{subId:"oj-dialog-header-close-wrapper"};
if(a.hasClass("oj-dialog-close-icon"))return{subId:"oj-dialog-close"};if(a.hasClass("oj-resizable-n"))return{subId:"oj-resizable-n"};if(a.hasClass("oj-resizable-e"))return{subId:"oj-resizable-e"};if(a.hasClass("oj-resizable-s"))return{subId:"oj-resizable-s"};if(a.hasClass("oj-resizable-w"))return{subId:"oj-resizable-w"};if(a.hasClass("oj-resizable-se"))return{subId:"oj-resizable-se"};if(a.hasClass("oj-resizable-sw"))return{subId:"oj-resizable-sw"};if(a.hasClass("oj-resizable-ne"))return{subId:"oj-resizable-ne"};
if(a.hasClass("oj-resizable-nw"))return{subId:"oj-resizable-nw"}}return null},Tq:function(){this.element.remove()},rt:function(){if(!this.wj){var a=this.wj={};a[b.N.Ac.Zr]=f.proxy(this.Xp,this);a[b.N.Ac.$r]=f.proxy(this.Tq,this);a[b.N.Ac.bn]=f.proxy(this.yZ,this)}return this.wj},Xp:function(){this.Zw=!0;this.close();delete this.Zw}})})();(function(){b.ya("oj.ojResizable",f.oj.baseComponent,{version:"1.0.0",widgetEventPrefix:"oj",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0,
maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,resize:null,start:null,stop:null},RK:function(a){return parseInt(a,10)||0},Je:function(a){return!isNaN(parseInt(a,10))},IX:function(a,b){if("hidden"===f(a).css("overflow"))return!1;var c=b&&"left"===b?"scrollLeft":"scrollTop",e=!1;if(0<a[c])return!0;a[c]=1;e=0<a[c];a[c]=0;return e},_ComponentCreate:function(){this._super();
var a,b,c,e,g,h=this;a=this.options;b=this.element.mouse.bind(this.element);b();this.Dm=b("instance");this.Dm._mouseCapture=function(a){return h.dia(a)};this.Dm._mouseStart=function(a){return h.gia(a)};this.Dm._mouseDrag=function(a){return h.eia(a)};this.Dm._mouseStop=function(a){return h.px(a)};this.element.addClass("oj-resizable");f.extend(this,{GE:this.element,OC:[],yk:null});this.handles=a.handles||(f(".oj-resizable-handle",this.element).length?{qsa:".oj-resizable-n",esa:".oj-resizable-e",zsa:".oj-resizable-s",
Wf:".oj-resizable-w",Bsa:".oj-resizable-se",Dsa:".oj-resizable-sw",rsa:".oj-resizable-ne",tsa:".oj-resizable-nw"}:"e,s,se");if(this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),a=this.handles.split(","),this.handles={},b=0;b<a.length;b++)c=f.trim(a[b]),g="oj-resizable-"+c,e=f("\x3cdiv class\x3d'oj-resizable-handle "+g+"'\x3e\x3c/div\x3e"),this.handles[c]=".oj-resizable-"+c,this.element.append(e);this.hka=function(){for(var a in this.handles)this.handles[a].constructor===
String&&(this.handles[a]=this.element.children(this.handles[a]).first().show())};this.hka();this.fga=f(".oj-resizable-handle",this.element);this.fga.mouseover(function(){h.g5||(this.className&&(e=this.className.match(/oj-resizable-(se|sw|ne|nw|n|e|s|w)/i)),h.axis=e&&e[1]?e[1]:"se")});this.Dm._mouseInit()},_destroy:function(){this.Dm&&this.Dm._mouseDestroy();try{this.Dm.destroy(),this.Dm=null}catch(a){}f(this.GE).removeClass("oj-resizable oj-resizable-disabled oj-resizable-resizing").removeData("resizable").removeData("oj-resizable").unbind(".resizable").find(".oj-resizable-handle").remove();
return this},dia:function(a){var b,c,e=!1;for(b in this.handles)if(c=f(this.handles[b])[0],c===a.target||f.contains(c,a.target))e=!0;return!this.options.disabled&&e},gia:function(a){var b,c,e;e=this.options;b=this.element.position();var g=this.element;this.g5=!0;/absolute/.test(g.css("position"))?g.css({position:"absolute",top:g.css("top"),left:g.css("left")}):g.is(".oj-draggable")&&g.css({position:"absolute",top:b.top,left:b.left});this.ika();b=this.RK(this.helper.css("left"));c=this.RK(this.helper.css("top"));
e.containment&&(b+=f(e.containment).scrollLeft()||0,c+=f(e.containment).scrollTop()||0);this.offset=this.helper.offset();this.position={left:b,top:c};this.size={width:g.width(),height:g.height()};this.Qj={width:g.width(),height:g.height()};this.Zo={left:b,top:c};this.SE={width:g.outerWidth()-g.width(),height:g.outerHeight()-g.height()};this.Gpa={left:a.pageX,top:a.pageY};this.Mk=this.Qj.width/this.Qj.height||1;e=f(".oj-resizable-"+this.axis).css("cursor");f("body").css("cursor","auto"===e?this.axis+
"-resize":e);g.addClass("oj-resizable-resizing");this.kL("start",a);this.C$(a);this.Yaa(a);return!0},eia:function(a){var b,c=this.helper,e={},g=this.Gpa;b=a.pageX-g.left||0;var g=a.pageY-g.top||0,h=this.Eh[this.axis];this.Ru={top:this.position.top,left:this.position.left};this.Su={width:this.size.width,height:this.size.height};if(!h)return!1;b=h.apply(this,[a,b,g]);this.Ema(a.shiftKey);a.shiftKey&&(b=this.Dma(b,a));b=this.vka(b,a);this.wma(b);this.kL("resize",a);this.B$(a,this.ui());this.Xaa(a,this.ui());
this.position.top!==this.Ru.top&&(e.top=this.position.top+"px");this.position.left!==this.Ru.left&&(e.left=this.position.left+"px");this.size.width!==this.Su.width&&(e.width=this.size.width+"px");this.size.height!==this.Su.height&&(e.height=this.size.height+"px");c.css(e);!this.yk&&this.OC.length&&this.eja();f.isEmptyObject(e)||this._trigger("resize",a,this.ui());return!1},px:function(a){this.g5=!1;f("body").css("cursor","auto");this.element.removeClass("oj-resizable-resizing");this.kL("stop",a);
this.D$(a);this.Zaa(a);return!1},Ema:function(a){var b,c,e,f;f=this.options;f={minWidth:this.Je(f.minWidth)?f.minWidth:0,maxWidth:this.Je(f.maxWidth)?f.maxWidth:Infinity,minHeight:this.Je(f.minHeight)?f.minHeight:0,maxHeight:this.Je(f.maxHeight)?f.maxHeight:Infinity};a&&(a=f.minHeight*this.Mk,c=f.minWidth/this.Mk,b=f.maxHeight*this.Mk,e=f.maxWidth/this.Mk,a>f.minWidth&&(f.minWidth=a),c>f.minHeight&&(f.minHeight=c),b<f.maxWidth&&(f.maxWidth=b),e<f.maxHeight&&(f.maxHeight=e));this.Hma=f},wma:function(a){this.offset=
this.helper.offset();this.Je(a.left)&&(this.position.left=a.left);this.Je(a.top)&&(this.position.top=a.top);this.Je(a.height)&&(this.size.height=a.height);this.Je(a.width)&&(this.size.width=a.width)},Dma:function(a){var b=this.position,c=this.size,e=this.axis;this.Je(a.height)?a.width=a.height*this.Mk:this.Je(a.width)&&(a.height=a.width/this.Mk);"sw"===e&&(a.left=b.left+(c.width-a.width),a.top=null);"nw"===e&&(a.top=b.top+(c.height-a.height),a.left=b.left+(c.width-a.width));return a},vka:function(a){var b=
this.Hma,c=this.axis,e=this.Je(a.width)&&b.maxWidth&&b.maxWidth<a.width,f=this.Je(a.height)&&b.maxHeight&&b.maxHeight<a.height,h=this.Je(a.width)&&b.minWidth&&b.minWidth>a.width,k=this.Je(a.height)&&b.minHeight&&b.minHeight>a.height,l=this.Zo.left+this.Qj.width,m=this.position.top+this.size.height,n=/sw|nw|w/.test(c),c=/nw|ne|n/.test(c);h&&(a.width=b.minWidth);k&&(a.height=b.minHeight);e&&(a.width=b.maxWidth);f&&(a.height=b.maxHeight);h&&n&&(a.left=l-b.minWidth);e&&n&&(a.left=l-b.maxWidth);k&&c&&
(a.top=m-b.minHeight);f&&c&&(a.top=m-b.maxHeight);a.width||a.height||a.left||!a.top?a.width||a.height||a.top||!a.left||(a.left=null):a.top=null;return a},eja:function(){if(this.OC.length){var a,b,c,e,f,h=this.helper||this.element;for(a=0;a<this.OC.length;a++){f=this.OC[a];if(!this.uu)for(this.uu=[],c=[f.css("borderTopWidth"),f.css("borderRightWidth"),f.css("borderBottomWidth"),f.css("borderLeftWidth")],e=[f.css("paddingTop"),f.css("paddingRight"),f.css("paddingBottom"),f.css("paddingLeft")],b=0;b<
c.length;b++)this.uu[b]=(parseInt(c[b],10)||0)+(parseInt(e[b],10)||0);f.css({height:h.height()-this.uu[0]-this.uu[2]||0,width:h.width()-this.uu[1]-this.uu[3]||0})}}},ika:function(){this.element.offset();this.helper=this.element},Eh:{e:function(a,b){return{width:this.Qj.width+b}},w:function(a,b){return{left:this.Zo.left+b,width:this.Qj.width-b}},n:function(a,b,c){return{top:this.Zo.top+c,height:this.Qj.height-c}},s:function(a,b,c){return{height:this.Qj.height+c}},se:function(a,b,c){return f.extend(this.Eh.s.apply(this,
arguments),this.Eh.e.apply(this,[a,b,c]))},sw:function(a,b,c){return f.extend(this.Eh.s.apply(this,arguments),this.Eh.w.apply(this,[a,b,c]))},ne:function(a,b,c){return f.extend(this.Eh.n.apply(this,arguments),this.Eh.e.apply(this,[a,b,c]))},nw:function(a,b,c){return f.extend(this.Eh.n.apply(this,arguments),this.Eh.w.apply(this,[a,b,c]))}},kL:function(a,b){"resize"!==a&&this._trigger(a,b,this.ui())},C$:function(){function a(a){f(a).each(function(){var a=f(this);a.data("oj-resizable-alsoresize",{width:parseInt(a.width(),
10),height:parseInt(a.height(),10),left:parseInt(a.css("left"),10),top:parseInt(a.css("top"),10)})})}var b=this.options;"object"!==typeof b.alsoResize||b.alsoResize.parentNode?a(b.alsoResize):b.alsoResize.length?(b.alsoResize=b.alsoResize[0],a(b.alsoResize)):f.each(b.alsoResize,function(b){a(b)})},B$:function(a,b){function c(a,c){f(a).each(function(){var a=f(this),e=f(this).data("oj-resizable-alsoresize"),g={};f.each(c&&c.length?c:a.parents(b.GE[0]).length?["width","height"]:["width","height","top",
"left"],function(a,b){var c=(e[b]||0)+(k[b]||0);c&&0<=c&&(g[b]=c||null)});a.css(g)})}var e=this.options,g=this.Qj,h=this.Zo,k={height:this.size.height-g.height||0,width:this.size.width-g.width||0,top:this.position.top-h.top||0,left:this.position.left-h.left||0};"object"!==typeof e.alsoResize||e.alsoResize.nodeType?c(e.alsoResize,null):f.each(e.alsoResize,function(a,b){c(a,b)})},D$:function(){f(this).removeData("oj-resizable-alsoresize")},Yaa:function(){var a,b,c,e,g,h=this,k=h.element;c=h.options.containment;
if(k=c instanceof f?c.get(0):/parent/.test(c)?k.parent().get(0):c)h.SD=f(k),/document/.test(c)||c===document?(h.TD={left:0,top:0},h.g2={left:0,top:0},h.$o={element:f(document),left:0,top:0,width:f(document).width(),height:f(document).height()||document.body.parentNode.scrollHeight}):(a=f(k),b=[],f(["Top","Right","Left","Bottom"]).each(function(c,e){b[c]=h.RK(a.css("padding"+e))}),h.TD=a.offset(),h.g2=a.position(),h.h2={height:a.innerHeight()-b[3],width:a.innerWidth()-b[1]},c=h.TD,e=h.h2.height,g=
h.h2.width,g=h.IX(k,"left")?k.scrollWidth:g,e=h.IX(k)?k.scrollHeight:e,h.$o={element:k,left:c.left,top:c.top,width:g,height:e})},Xaa:function(a,b){var c,e,f,h;c=this.options;e=this.TD;h=this.position;var k=a.shiftKey;f={top:0,left:0};var l=this.SD,m=!0;l[0]!==document&&/static/.test(l.css("position"))&&(f=e);h.left<(this.yk?e.left:0)&&(this.size.width+=this.yk?this.position.left-e.left:this.position.left-f.left,k&&(this.size.height=this.size.width/this.Mk,m=!1),this.position.left=c.helper?e.left:
0);h.top<(this.yk?e.top:0)&&(this.size.height+=this.yk?this.position.top-e.top:this.position.top,k&&(this.size.width=this.size.height*this.Mk,m=!1),this.position.top=this.yk?e.top:0);this.offset.left=this.$o.left+this.position.left;this.offset.top=this.$o.top+this.position.top;c=Math.abs((this.yk?this.offset.left-f.left:this.offset.left-e.left)+this.SE.width);e=Math.abs((this.yk?this.offset.top-f.top:this.offset.top-e.top)+this.SE.height);f=this.SD.get(0)===this.element.parent().get(0);h=/relative|absolute/.test(this.SD.css("position"));
f&&h&&(c-=Math.abs(this.$o.left));c+this.size.width>=this.$o.width&&(this.size.width=this.$o.width-c,k&&(this.size.height=this.size.width/this.Mk,m=!1));e+this.size.height>=this.$o.height&&(this.size.height=this.$o.height-e,k&&(this.size.width=this.size.height*this.Mk,m=!1));m||(this.position.left=b.Ru.left,this.position.top=b.Ru.top,this.size.width=b.Su.width,this.size.height=b.Su.height)},Zaa:function(){var a=this.options,b=this.TD,c=this.g2,e=this.SD,g=f(this.helper),h=g.offset(),k=g.outerWidth()-
this.SE.width,g=g.outerHeight()-this.SE.height;this.yk&&!a.animate&&/relative/.test(e.css("position"))&&f(this).css({left:h.left-c.left-b.left,width:k,height:g});this.yk&&!a.animate&&/static/.test(e.css("position"))&&f(this).css({left:h.left-c.left-b.left,width:k,height:g})},ui:function(){return{GE:this.GE,element:this.element,helper:this.helper,position:this.position,size:this.size,Qj:this.Qj,Zo:this.Zo,Su:this.Su,Ru:this.Ru}}})})()});