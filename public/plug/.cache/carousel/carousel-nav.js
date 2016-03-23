/*TMODJS:{"version":39,"md5":"a08e09c29d6ed726e5b33f12de91235a"}*/
template('carousel/carousel-nav',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul class="carousel-nav"> ';
$each($data,function($value,$index){
$out+=' ';
if($index == 0){
$out+=' <li class="red" data-index="';
$out+=$escape($value);
$out+='">';
$out+=$escape($value + 1);
$out+='</li> ';
}else{
$out+=' <li data-index="';
$out+=$escape($value);
$out+='">';
$out+=$escape($value + 1);
$out+='</li> ';
}
$out+=' ';
});
$out+=' </ul>';
return new String($out);
});