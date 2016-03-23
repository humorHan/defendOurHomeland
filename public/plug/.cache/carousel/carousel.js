/*TMODJS:{"version":7,"md5":"6fed9242d36f87fcb196a10aefd7aa21"}*/
template('carousel/carousel',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul class="none"> ';
$each($data,function($value,$index){
$out+=' <li> <a href="javascript:;"> <img src="../images/';
$out+=$escape($value+1);
$out+='.jpg"> </a> </li> ';
});
$out+=' </ul>';
return new String($out);
});