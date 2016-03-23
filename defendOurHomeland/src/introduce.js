/**
 * Created by Administrator on 2015/5/7.
 */
var IntroduceLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.size = cc.winSize;
        //背景
        var start = new cc.Sprite(res.startBg);
        start.attr({
            x: this.size.width / 2,
            y: this.size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(start,0);
        //主人公
        var heroAnimateStartBg = new HeroAnimate();
        heroAnimateStartBg.attr({
            x: 100,
            y: this.size.height / 2 + 100,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(heroAnimateStartBg,1);
        //按键介绍
        var introduce = new cc.Sprite(res.introduce);
        introduce.attr({
            x: this.size.width / 2,
            y: this.size.height / 2 + 70,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(introduce,0);
        //返回
        var back = new cc.MenuItemImage(
            res.back,
            res.backClick,
            this.back,
            this
        );
        back.attr({
            x: this.size.width -70,
            y: 50,
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 0.5
        });
        var menu = new cc.Menu(back);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,1);
    },
    back: function(){
        var start = new StartScene();
        cc.director.runScene(cc.TransitionMoveInL.create(1,start));
    }
});
var IntroduceScene = cc.Scene.extend({
   onEnter: function(){
       this._super();
       var introduceLayer = new IntroduceLayer();
       this.addChild(introduceLayer);
   }
});
