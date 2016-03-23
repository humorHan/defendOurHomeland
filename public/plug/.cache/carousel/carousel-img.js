/*TMODJS:{"version":36,"md5":"e379ac72b1c0685c97ca14d9241de3db"}*/
template('carousel/carousel-img',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul class="carousel-img"> ';
$each($data,function($value,$index){
$out+=' <li class="none"> <a href="javascript:;"> <img src="../images/';
$out+=$escape($value+1);
$out+='.jpg"> </a> </li> ';
});
$out+=' </ul>';
return new String($out);
});