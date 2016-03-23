/**
 * Created by Joan on 2015/11/10.
 */
require([
    //依赖
    'jquery',
    'template',
    'sum'
],function($, template, sum){
    var s = {
        init: function(){
            sum.init(10,20);
        },
        initBtn: function(){
            $(".btn").bind("click", function(){
                $(this).html(template("demo/haha",['1','2','3']));
            });
        }
    };
    s.init();
    s.initBtn();
});