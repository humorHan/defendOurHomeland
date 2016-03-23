/*TMODJS:{"version":18,"md5":"18d7bf9910a4328368599b83b399bb25"}*/
template('leftMenu/first',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,results=$data.results,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(results,function($value,$index){
$out+=' <div class="item"> <span class="first-name">';
$out+=$escape($value.name);
$out+='</span> <i>></i> </div> ';
});
$out+=' <div class="second"></div>';
return new String($out);
});