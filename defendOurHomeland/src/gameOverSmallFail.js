/**
 * Created by Administrator on 2015/4/9.
 */
var GameOverLayerSmallFail = cc.Layer.extend({
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
        //添加胜利消息
        var message = new cc.LabelTTF("苟延残喘","American Typewriter",50,"yellow",cc.TEXT_ALIGNMENT_LEFT);
        message.attr({
            x: 400,
            y: 300
        });
        this.addChild(message,0);
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
var GameOverSceneSmallFail = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var gameOverLayerSmallFail = new GameOverLayerSmallFail();
        this.addChild(gameOverLayerSmallFail);
    }
});
