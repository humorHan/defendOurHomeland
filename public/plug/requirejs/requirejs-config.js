/**
 * Created by lsc on 2014/11/28.
 */
require.config({
	//根路径，绝对路径是根据url地址来的,相对路径是根据html页面位置来的
    baseUrl: '/humorHan/test/public/js',
    paths:{
        'jquery':['http://cdn.bootcss.com/jquery/1.9.1/jquery.min','./../plug/jquery-1.9.1.min'],
        'domReady':'./../plug/requirejs/domReady',
        'template':'./../plug/template',
        'css':'./../plug/requirejs/css.min',
        'mock':'./../plug/mock'
    },
    //发布的版本号
    urlArgs: "v=1.1.0"
});