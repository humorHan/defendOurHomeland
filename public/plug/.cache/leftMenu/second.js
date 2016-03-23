/*TMODJS:{"version":27,"md5":"26a2874f23e3d4dae19396eb6cafb138"}*/
template('leftMenu/second',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,children=$data.children,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(children,function($value,$index){
$out+=' <div class="secondItem"> <div class="secondItemName fl"> <span>';
$out+=$escape($value.name);
$out+='</span> <i>></i> </div> <ul class="secondItemList"> ';
$each($value.children,function($value,$index){
$out+=' <li>';
$out+=$escape($value);
$out+='</li> ';
});
$out+=' </ul> </div> ';
});
return new String($out);
});