/**
 * Created by Administrator on 2015/4/9.
 */
var HeroAnimate = cc.Sprite.extend({
    ctor: function(){
        this._super();
        //先预加载
        var texture = cc.textureCache.addImage(res.heroStartBg);
        var f0 = cc.SpriteFrame.createWithTexture(texture,cc.rect(0,0,262,230));
        var f1 = cc.SpriteFrame.createWithTexture(texture,cc.rect(259,0,262,230));
        var animateFrame = [];
        animateFrame.push(f0);
        animateFrame.push(f1);
        var animation = cc.Animation.create(animateFrame,0.2);
        var animate = cc.Animate.create(animation);
        var animateRep = cc.RepeatForever.create(animate);
        this.runAction(animateRep);
    }
});