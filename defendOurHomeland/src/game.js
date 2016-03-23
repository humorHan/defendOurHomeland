/**
 * Created by HanJiaYi on 2015/4/9.
 * 游戏主逻辑
 * 控制介绍：
 *        w：上移动
 *        s：下移动
 *        Enter：开始游戏
 *        空格：发射飞镖
 * 设计介绍：该游戏是保卫性质而非侵略性质，上下左右移动在游戏中更像是冒险闯关类游戏，所以设计是主人公凯奇只能上下移动。
 *          设置开始游戏按钮是为了让在游戏开始前，可以进去“试玩”状态，帮助熟悉操作按键。
 *          游戏不能太混乱，所以当飞镖或者敌人数量达到一定程度就暂时不再添加
 *          下落之前的奔跑速度都是一定的
 */
var GameLayer = cc.Layer.extend({
    _temp: 0,
    //分数
    _score:0,
    //飞镖数量，超过一定数量会暂时停止添加
    _darts: [],
    //敌人数量，超过一定数量会暂时停止添加(死亡敌人不计数，落地敌人不计数)
    _enemy: [],
    //所有出现敌人的总数量
    _number: 0,
    //开始游戏标志
    _flagStart: false,
    //假设从第后一个入口(暂定一共三个入口)进入村庄需要三秒奔跑才能下落
    _time : 3,
    //敌人开始下落时候的X坐标可能值
    _enemyPositions : [80,220,450],
    //上边那个变量的长度（性能优化）
    _length: 0,
    //下落时间最小值(最大值是8)
    _downTimeMin: 4,
    //添加敌人标志
    _flagAddEnemy: true,
    //添加飞镖标志
    _flagAddDart: true,
    //同一时刻，允许出现敌人的最大数量（落地的不计数）
    _enemyMaxNum: 5,
    //本游戏第一关的敌人数量（添加敌人的标志）这个数值不能太小
    _enemyMaxNumber: 30,
    //允许出现飞镖的最大数量
    _dartMaxNum: 3,
    //地上敌人的数量
    _numberGround: 0,
    //允许地上敌人最多的数量
    _numberGroundMax: 3,
    //发生碰撞的子弹数组和敌人数组
    //发生碰撞的子弹
    _dartRemove : [],
    //发生碰撞的敌人
    _enemyRemove : [],
    ctor: function(){
        this._super();
        this.size = cc.winSize;
        var music_file="res/soundtrack.mp3";
        cc.audioEngine.stopMusic(music_file,true);
        var music_file="res/ambient.mp3";
        cc.audioEngine.playMusic(music_file,true);
        //背景
        var gameBg = new cc.Sprite(res.gameBg);
        gameBg.attr({
            x: this.size.width / 2,
            y: this.size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(gameBg,0);
        //分数
        this.labelScore = new cc.LabelTTF("0", "Arial", "20");
        this.labelScore.setPosition(cc.p(this.size.width- 40,this.size.height- 30));
        this.addChild(this.labelScore,0);
        //添加主人公凯奇
        this.heroAnimate = new HeroAnimate();
        this.heroAnimate.attr({
            x: this.size.width - 100,
            y: this.size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 0.5,
            flippedX: true
        });
        this.addChild(this.heroAnimate,1);
        //发射飞镖
        this.addKeyBoardListener();
        this._length = this._enemyPositions.length;
        this.schedule(this.addEnemy,1);
        this.schedule(this.update);
    },
    addKeyBoardListener: function(){
        var tThis = this;
        var moveUp = new cc.moveBy(0.1, cc.p(0, 8));
        var moveDown = new cc.moveBy(0., cc.p(0, -8));
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keycode){
                switch (keycode) {
                    case 87:
                        if (tThis.heroAnimate.getPosition().y < tThis.size.height -  tThis.heroAnimate.getContentSize().height / 4) {
                            tThis.heroAnimate.runAction(moveUp);
                        }
                        break;
                    case 83:
                        if (tThis.heroAnimate.getPosition().y > 150) {
                            tThis.heroAnimate.runAction(moveDown);
                        }
                        break;
                    case 13:
                        //开始游戏按键，点击开始出现敌人
                        tThis._flagStart = true;
                        break;
                }
            },
            onKeyReleased: function(keycode){
                if(keycode == 32){
                    tThis.addDart();
                }
            }
        },tThis);
    },
    addEnemy: function(){
        //添加敌人的三个约束：1.开始； 2.最多同时出现5个敌人 3.第一关最多30个敌人
        if (this._flagStart == true && this._flagAddEnemy == true && this._number < this._enemyMaxNumber) {
            this._number++;
            this.enemy = new EnemyAnimate();
            //敌人开始下落时候的X坐标
            var x = this._enemyPositions[Math.ceil(Math.random() * 3) - 1];
            var y = this.size.height - 65;
            this.enemy.attr({
                width: 50,
                height: 66,
                x: 0,
                y: y,
                anchor: 0.5
            });
            this.addChild(this.enemy, 2);
            this.enemy.setTag(2);
            this._enemy.push(this.enemy);
            var moveRun = new cc.MoveTo(x / this._enemyPositions[this._length - 1] * this._time, cc.p(x, y));
            var random = Math.random();
            //下落时间在4~8秒之间
            this.moveDown = new cc.MoveTo(random > 0.5 ? random * this._downTimeMin * 2 : this._downTimeMin, cc.p(x, 50));
            var moveDownDone = new cc.CallFunc(function () {
                this._numberGround++;
            }, this);
            this.enemy.runAction(new cc.Sequence(moveRun, this.moveDown, moveDownDone));
            //如果有单独美工就更好了，可以在敌人下落时候给他的头骨上增加一个直升机的翅膀，既不单调又有趣且吸引眼球
            //TODO 落地以后走向一个位置（粮食，牲畜，人类）
        }
        if (this._number >= this._enemyMaxNumber || this._numberGround >= this._numberGroundMax) {
            switch (this._numberGround) {
                //完败
                case 3:
                    var gameOverScene = new GameOverSceneFail();
                    cc.director.runScene(cc.TransitionFadeTR.create(1,gameOverScene));
                    break;
                //苟延残喘
                case 2:
                    var gameOverScene = new GameOverSceneSmallFail();
                    cc.director.runScene(cc.TransitionFadeTR.create(1,gameOverScene));
                    break;
                //胜利
                case 1:
                    var gameOverScene = new GameOverSceneVictory();
                    cc.director.runScene(cc.TransitionFadeTR.create(1,gameOverScene));
                    break;
                //完胜
                case 0:
                    var gameOverScene = new GameOverSceneBigVictory();
                    cc.director.runScene(cc.TransitionFadeTR.create(1,gameOverScene));
                    break;
                //话说下边这个可能暂时用不到，暂跳转到完败把
                default :
                    var gameOverScene = new GameOverSceneFail();
                    cc.director.runScene(cc.TransitionFadeTR.create(1,gameOverScene));
                    break;
            }
        }
    },
    update: function(){
        this._flagAddEnemy = this._enemy.length >= this._enemyMaxNum ? false : true;
        this._flagAddDart = this._darts.length >= this._dartMaxNum ? false : true;
        //碰撞检测
        for (var i in this._darts) {
            var dartsRect = this._darts[i].getBoundingBox();
            for (var j in this._enemy) {
                var enemyRect = this._enemy[j].getBoundingBox();
                if (cc.rectIntersectsRect(dartsRect,enemyRect)) {
                    //千万不要这样删除，否则删除this._dart[i]的时候这个i可能已经改变了
                    //this.removeDartOrEnemy(this._darts[i]);
                    //this.removeDartOrEnemy(this._enemy[j]);
                    this._dartRemove.push(this._darts[i]);
                    this._enemyRemove.push(this._enemy[j]);
                    enemyRect = null;
                    this._score += 100;
                    this.labelScore.setString(this._score.toString());
                }
            }
        }
        //删除发生碰撞的敌人和子弹
        for (var x in this._dartRemove) {
            var indexDelete1 = this._darts.indexOf(this._dartRemove[x]);
            if (indexDelete1 > -1) {
                this._darts.splice(indexDelete1,1);
            }
            this.removeChild(this._dartRemove[x]);
        }
        for (var y in this._enemyRemove) {
            var indexDelete2 = this._enemy.indexOf(this._enemyRemove[y]);
            if (indexDelete2 > -1) {
                this._enemy.splice(indexDelete2,1);
            }
            this.removeChild(this._enemyRemove[y]);
        }
        this._dartRemove = [];
        this._enemyRemove = [];
    },
    addDart: function(){
        if (this._flagAddDart == true) {
            //子弹位置
            this.dart = new cc.Sprite(res.dart);
            this.heroAnimatePosition = this.heroAnimate.getPosition();
            this.dart.attr({
                x: this.heroAnimatePosition.x - this.dart.width / 2,
                y: this.heroAnimatePosition.y - 30
            });
            this.addChild(this.dart, 0);
            //为子弹添加标志
            this.dart.setTag(1);
            this._darts.push(this.dart);
            //动作和时间
            this.dartMove = new cc.MoveTo(1, cc.p(-this.dart.width / 2, this.heroAnimatePosition.y - 30));
            var removeDart = new cc.callFunc(this.removeDartOrEnemy, this);
            this.dart.runAction(new cc.Sequence(this.dartMove, removeDart));
        }
    },
    removeDartOrEnemy: function(sth){
        this.removeChild(sth,true);
        if (sth) {
            if (sth.getTag() == 1) {
                var index1 = this._darts.indexOf(sth);
                if (index1 > -1) {
                    this._darts.splice(sth, 1);
                }
            }
            //目前不用使用下边这个
            if (sth.getTag() == 2) {
                var index2 = this._enemy.indexOf(sth);
                if (index2 > -1) {
                    this._enemy.splice(sth, 1);
                }
            }
        }
    }
});
var GameScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var gameLayer = new GameLayer();
        this.addChild(gameLayer);
    }
});