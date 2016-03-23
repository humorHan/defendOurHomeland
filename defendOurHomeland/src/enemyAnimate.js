/**
 * Created by Administrator on 2015/4/10.
 */
var EnemyAnimate = cc.Sprite.extend({
    ctor: function(){
        this._super();
        //先预加载
        var texture = cc.textureCache.addImage(res.enemy);
        var f0 = cc.SpriteFrame.createWithTexture(texture,cc.rect(0,0,50,66));
        var f1 = cc.SpriteFrame.createWithTexture(texture,cc.rect(52,0,45,66));
        var f2 = cc.SpriteFrame.createWithTexture(texture,cc.rect(52,140,47,66));
        var f3 = cc.SpriteFrame.createWithTexture(texture,cc.rect(0,210,55,66));
        var animateFrame = [];
        animateFrame.push(f0);
        animateFrame.push(f1);
        animateFrame.push(f2);
        animateFrame.push(f3);
        var animation = cc.Animation.create(animateFrame,0.09);
        var animate = cc.Animate.create(animation);
        var animateRep = cc.RepeatForever.create(animate);
        this.runAction(animateRep);
    }
});