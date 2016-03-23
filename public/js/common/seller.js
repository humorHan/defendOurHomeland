/**
 * Created by Joan on 2016/2/16.
 * 卖家秀部分
 */
define([
    'jquery',
    'template',
    'css!../../module-css/seller.css'
],function($, template){
    var _$el;
    var seller = {
        initDom: function(){
            _$el.html(template("seller/seller-message"));
        }
    };
    return {
        init: function(dom){
            _$el = $("." + dom);
            seller.initDom();
        }
    }
});