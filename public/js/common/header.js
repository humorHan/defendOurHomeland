/**
 * 网站头部插件
 * Created by Joan on 2015/11/18.
 */
define([
    'jquery',
    'template',
    'css!../../module-css/header.css'
],function($, template){
    var _$el;
    var header = {
        initDom: function(){
            _$el.html(template("header/user-information"));
            _$el.append(template("header/header-main-content"));
        }
    };
    return {
        init: function(dom){
            _$el = $("." + dom);
            header.initDom();
        }
    }
});