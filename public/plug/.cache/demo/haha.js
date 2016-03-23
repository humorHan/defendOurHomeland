/*TMODJS:{"version":29,"md5":"e860611623973ac35b9cb0930c84a025"}*/
template('demo/haha',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each($data,function($value,$index){
$out+=' <div class="red">';
$out+=$escape($value);
$out+='</div> ';
});
return new String($out);
});