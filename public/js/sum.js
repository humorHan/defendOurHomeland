/**
 * Created by Joan on 2015/11/10.
 */
define([
    //依赖
],function(){
    var _num1,_num2;
    var sum = {
        init: function(){
            alert (_num1 + _num2);
        }
    };
    return {
        init: function(num1,num2){
            _num1 = num1;
            _num2 = num2;
            sum.init();
        }
    }
});