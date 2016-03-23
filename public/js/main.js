/**
 * Created by Joan on 2015/11/11.
 */
require([
    'domReady!',
    'jquery',
    'template',
    'common/header',
    'common/leftMenu',
    'common/carousel',
    'common/notice',
    'common/seller'
],function(dom, $, template, header, leftMenu, carousel, notice, seller){
    var main = {
        init: function(){
            header.init("header");
            leftMenu.init("nav");
            carousel.init("carousel", 3);
            notice.init("notice");
            seller.init("seller");
            $(".disclaimer").show();
        }
    };
    main.init();
});
