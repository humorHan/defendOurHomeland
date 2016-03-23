/**
 * Created by lsc on 2014/12/7.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([
                'jquery',
                'template'
                ], factory);
    } else {
        root.util = factory(root.$||root.jQuery,template);
    }
})(this, function ($,template) {
	var _id = 0;
	var SHOW_POP_TYPE_SUCCESS = 0;
	var SHOW_POP_TYPE_FAIL = 1;
	var SHOW_POP_TYPE_WARNING = 2;
    return {
        forEach: function (array, callback, scope) {
            scope = scope || null;
            array = [].slice.call(array);//将array对象转化为数组,array不一定是个数组
            if (!(array instanceof Array)) {
                //console.log('array is not a Array!!!');
                return;
            }
            for (var i = 0, len = array.length; i < len; i++) {
                if (!callback.call(scope, array[i], i)) {//array[i],maps[i],
                    continue;
                } else {
                    break;
                }
            }
        },
        /**
         * url参数获取接口，经过decodeURI，如果没有传递key值，则返回当前页面的所有参数，如果有key返回key对应的内容，
         * 如果key没有对应的内容，则返回空字符串
         * @param key
         * @returns {*}
         */
        getParams: function (key) {
            var paramsStr = location.href.indexOf('#') > 0 ? location.href.substring(location.href.indexOf("#") + 1, location.href.length) : '';
            //获取所有的#即以前的？后面的值，相当于location.search
            var maps, paramsObj = {};
            if (paramsStr === '') {
                return '';
            }
            paramsStr = decodeURI(paramsStr);//解码的paramStr
            maps = paramsStr.split('&');//将&之前的字符串都放入数组里面
            this.forEach(maps, function (item) {//循环数组,arguments[0]
                var paramList = item.split('=');//item为maps[i]
                if(paramList.length<2 && paramList[0] == ''){
                	return;
                }
                paramsObj[paramList[0]] = paramList[1];
            });
            if (key) {//如果key有值得话
                return paramsObj[key] || '';//则返回对象里可以属性的值否则返回空
            } else {
                return paramsObj;//如果key传过来的是没有的话，即什么都没传的话则返回paramsObj的对象
            }
        },
        addEvent: function (el, type, callback) {
            if (document.attachEvent) {//如果页面文档中存在attachEvent方法
                el.attachEvent('on' + type, function () {
                    //console.log(arguments);
                    var params = [].slice.call(arguments,0);
                    params.splice(0,0,window.event);
                    callback.apply(el, params);
                });
            } else {
                el.addEventListener(type, function (e) {
                    callback.apply(el,arguments);
                }, false);
            }
        },
        //是否是IE678
        isIE678: function () {
            return ('a~b'.split(/(~)/))[1] == "b";
        },
        //去空格
        trimAll: function(str) {
            return str.replace(/ +/g,'');
        },
        SHOW_POP_TYPE_SUCCESS:SHOW_POP_TYPE_SUCCESS,
        SHOW_POP_TYPE_FAIL:SHOW_POP_TYPE_FAIL,
        SHOW_POP_TYPE_WARNING:SHOW_POP_TYPE_WARNING,
        /**
         * 显示提示信息（要求每个要显示的页面都要有pop-mask div），
         * 警示图片命名使用格式show-pop0.png代表sucess，show-pop1.png代表fail，跟上边的参数定义一致
         * @param title 顶部显示框的标题
         * @param message 内容值
         * @param type 警示图片的类型，通过util.js返回对象获取，不写默认是success
         */
        showMsgInfo:function(title,message,type){
        	type = type ? type : SHOW_POP_TYPE_SUCCESS;
        	var msgInfoId = 'msg-pop-' + _id++; 
        	var data = {
        		title:title,
        		message:message,
        		msgInfoId:msgInfoId,
        		type:type
        	};
        	$("body").append(template('warning-box/warning-box-templ',data));
        	//关闭图标跟取消的点击事件封装，但是确认的就自己写
        	$("#"+ msgInfoId +" .cancel,#"+msgInfoId+" .close-box").click(function(){
        		$('#' + msgInfoId).hide();
        		$(".pop-mask").hide();
        	});
        	return function(){
    			$('#' + msgInfoId).show();
    			$(".pop-mask").show();
    		};
        },
		//@params selector:有相应需求的table选择器
		//布局要求：内容区必须用tbody包裹，点击排序的标志需用a标签包裹
        //callback代表这次排序完成之后调用的。
		trSort:function(selector,callback){
			var self = this;
			$(selector).each(function(i,e){
				$(e).find("th a").each(function(index,element){
					element.num = 0;
					$(element).click(function(){
						element.num++;
						var index = $(this).parent().index();
						var trArr = $(this).closest("table").find("tbody tr");
						if(element.num%2){
							trArr.sort(function(v1,v2){
								var tdv1 = $(v1).find("td:eq("+index+")").text();
								var tdv2 = $(v2).find("td:eq("+index+")").text();
								return tdv2 - tdv1;
							});
							$(this).find("img").attr("src","/diagnosis/public/images/green-sort-arrow-up.png");
						}else{
							trArr.sort(function(v1,v2){
								var tdv1 = $(v1).find("td:eq("+index+")").text();
								var tdv2 = $(v2).find("td:eq("+index+")").text();
								return tdv1 - tdv2;
							});
							$(this).find("img").attr("src","/diagnosis/public/images/green-sort-arrow.png");
						}
						$(this).closest("table").find("tbody").html(trArr);
                        if(callback){
                            callback();
                        }
					});
				});
			});
		},
        //根据阿拉伯数字生成中文数字
        coverNum:function(num){
            //230021
            var zhNum=['零','一','二','三','四','五','六','七','八','九'],
                unit=['','十','百','千'];
            if(typeof(num = num-0) === "number" && num<10000){
                var numStr = num+'',unitNum,result='',currentNumStr,currentIndex;
                for(var i = 0; i<numStr.length; i ++){
                    currentNumStr = numStr[i];
                    if(currentNumStr == 0){
                        result += zhNum[currentNumStr - 0];
                    }else{
                        result += zhNum[currentNumStr - 0] + unit[numStr.length - i - 1];
                    }
                }
                result = result.replace(/零+/g,'零');
                return result;
            }else{
                throw new Error('参数错误，不是数字类型');
            }
        },
        //计算echart title 高度
        eHeight: function(array){
            array = [].slice.call(array);//将array对象转化为数组,array不一定是个数组
            if (!(array instanceof Array)) {
                return;
            }
            var StringPx = array.join('').length*14;
            var elsePL = array.length*(20+10);
            var YHeight = Math.ceil((StringPx+elsePL)/740)*30;
            return YHeight < 60 ? 60 : YHeight;
        },
        //转换时间格式
        getTime: function (date, format) {
            date = new Date(date * 1000);

            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //日
                "h": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
                var v = map[t];
                if (v !== undefined) {
                    if (all.length > 1) {
                        v = '0' + v;
                        v = v.substr(v.length - 2);
                    }
                    return v;
                }
                else if (t === 'y') {
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        },
        getBrowser : function(){
            var Sys = {};
            var ua = navigator.userAgent.toLowerCase();
            var s;
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
            (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
            (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

            if (Sys.ie) {return 'ie'};
            if (Sys.firefox) {return 'firefox'};
            if (Sys.chrome) {return 'chrome'};
            if (Sys.opera) {return 'opera'};
            if (Sys.safari) {return 'safari'};
        }

    };
});