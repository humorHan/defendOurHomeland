/**
 * Created by Administrator on 2015/4/9.
 * 游戏开始界面
 * 命名规则：1.驼峰命名法  2.主要变量名字后边跟上场景名称  比如heroAnimateStartBg中的startBg是开始界面。
 */
var StartLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.size = cc.winSize;
        //开始界面背景
        var start = new cc.Sprite(res.startBg);
        start.attr({
            x: this.size.width / 2,
            y: this.size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(start,0);
        var music_file="res/soundtrack.mp3";
        cc.audioEngine.playMusic(music_file,true);
        //开始界面英雄
        var heroAnimateStartBg = new HeroAnimate();
        heroAnimateStartBg.attr({
            x: -100,
            y: this.size.height / 2 + 100,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(heroAnimateStartBg,1);
        var heroMoveStartBg = new cc.MoveTo(1,cc.p(100,this.size.height / 2 + 100));
        heroAnimateStartBg.runAction(heroMoveStartBg);
        var delayTime = new cc.DelayTime(2);
        var callFun = new cc.CallFunc(this.addDart,this);
        var seq = new cc.Sequence(delayTime,callFun);
        this.runAction(seq);
        //添加开始界面敌人
        var enemyAnimateStartBg = new EnemyAnimate();
        enemyAnimateStartBg.attr({
            x: this.size.width / 2 + 70,
            y: 135,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(enemyAnimateStartBg,1);
        var enemyMoveStartBg1 = new cc.MoveTo(2,cc.p(this.size.width - 185, 125));
        var enemyMoveStartBg2 = new cc.MoveTo(3,cc.p(this.size.width + 25, 50));
        var sequenceStartBg = new cc.sequence(enemyMoveStartBg1,enemyMoveStartBg2);
        enemyAnimateStartBg.runAction(sequenceStartBg);
        //开始按钮
        var startMenu = new cc.MenuItemImage(
            res.startMenu,
            res.startMenuClick,
            this.goGame,
            this);
        startMenu.attr({
            x: this.size.width / 2,
            y: this.size.height / 2,
            scale: 1.5,
            anchorX: 0.5,
            anchorY: 0.5
        });
        //游戏介绍按钮
        var introduceMenu = new cc.MenuItemImage(
            res.introduceMenu,
            res.introduceMenuClick,
            this.introduce,
            this
        );
        introduceMenu.attr({
            x: this.size.width / 2,
            y: this.size.height / 2 - 50 ,
            scale: 1.5,
            anchorX: 0.5,
            anchorY: 0.5
        });
        var menu = new cc.Menu(startMenu,introduceMenu);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,2);
    },
    goGame: function(){
        var gameScene = new GameScene();
        cc.director.runScene(cc.TransitionFadeTR.create(1,gameScene));
    },
    introduce: function(){
        var introduceScene = new IntroduceScene();
        cc.director.runScene(cc.TransitionMoveInL.create(1,introduceScene));
    },
    //开始界面增加飞镖
    addDart: function(){
        this.dartStartBg = new cc.Sprite(res.dart);
        this.dartStartBg.attr({
            x: 150,
            y: this.size.height / 2 + 20,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(this.dartStartBg,1);
        var moveToEnemy = new cc.moveTo(0.8,cc.p(this.size.width - 185,100));
        var callFun = new cc.CallFunc(this.disabled,this);
        var seq = new cc.Sequence(moveToEnemy,callFun);
       this.dartStartBg.runAction(seq);
    },
    //开始界面飞镖消失
    disabled: function(){
        this.dartStartBg.setVisible(false);
    }
});
var StartScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var startLayer = new StartLayer();
        this.addChild(startLayer);
    }
});