/**
 * Created by Administrator on 2015/12/12.
 * 网站左侧导航
 */
define([
    'jquery',
    'template',
    'fakeData/leftMenuData',
    'css!../../module-css/leftMenu.css'
],function($, template,leftMenuData){
    var _$el;
    var data = leftMenuData;  //纯粹为了写着省事
    //console.log(data);
    var leftMenu = {
        initDom: function(){
            _$el.html(template("leftMenu/first",leftMenuData));
        },
        //渲染二级菜单
        renderSecond: function(index){
            _$el.find(".second").html(template("leftMenu/second", data.results[index])).show();
            _$el.find(".second").css({
                'left': $(".carousel").offset().left - 10,
                'top': $(".carousel").offset().top
            });
        },
        initBtns: function(){
            var tThis = this;
            //划过的增加hover
            _$el.delegate('.item', 'mouseover', function(){
                $(this).addClass("hover");
                tThis.renderSecond($(this).index());
            }).delegate('.item', 'mouseout', function(){
                $(this).removeClass("hover");
                _$el.find(".second").hide();
            });
            //划过二级菜单的时候不能消失
            _$el.find(".second").bind("mouseover",function(){
                _$el.find(".second").show();
            }).bind("mouseout",function(){
                _$el.find(".second").hide();
            });
        }
    };
    return {
        /**
         * 网站左侧导航
         * @param dom 左侧导航的父节点
         */
        init: function (dom) {
            _$el = $("." + dom);
            leftMenu.initDom();
            leftMenu.initBtns();
        }
    };
});