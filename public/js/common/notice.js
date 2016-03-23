/**
 * Created by Joan on 2016/2/16.
 * 网站 快报  部分
 */
define([
    'jquery',
    'template',
    'fakeData/noticeData',
    'css!../../module-css/notice.css'
],function($, template, fakeData){
    var _$el;
    var data = fakeData;
    var notice = {
        initDom: function(){
            _$el.html(template("notice/list", data));
        }
    };
    return {
        init: function(dom){
            _$el = $("." + dom);
            notice.initDom();
        }
    }
});
