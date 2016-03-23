/*TMODJS:{"version":13,"md5":"c8c86482710c921ab79880a71d643d91"}*/
template('notice/list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,results=$data.results,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="title"> <div class="titleName">U购快报</div> <a href="javascript:;" class="titleMore">更多 > </a> </div> <ul class="content"> ';
$each(results,function($value,$index){
$out+=' <li> <a href="javascript:;"> ';
if($value.type == 0){
$out+=' <span class="contentType">[特惠] </span> ';
}else{
$out+=' <span class="contentType">[公告] </span> ';
}
$out+=' ';
$out+=$escape($value.content);
$out+=' </a> </li> ';
});
$out+=' </ul>';
return new String($out);
});