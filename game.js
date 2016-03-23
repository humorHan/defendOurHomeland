保卫我的家园主逻辑V1.0
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
    //飞镖数量，超过一定数量会暂时停止添加
    _darts: [],
    //敌人数量，超过一定数量会暂时停止添加
    _enemy: [],
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
    ctor: function(){
       this._super();
       this.size = cc.winSize;
       //背景
       var gameBg = new cc.Sprite(res.gameBg);
       gameBg.attr({
           x: this.size.width / 2,
           y: this.size.height / 2,
           anchorX: 0.5,
           anchorY: 0.5
       });
       this.addChild(gameBg,0);
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
                            break;
                        }
                    case 83:
                        if (tThis.heroAnimate.getPosition().y > tThis.heroAnimate.getContentSize().height / 4) {
                            tThis.heroAnimate.runAction(moveDown);
                            break;
                        }
                    case 13:
                        //开始游戏按键，点击开始出现敌人
                        tThis._flagStart = true;
                }
            },
            onKeyReleased: function(keycode){
                if(keycode== 32){
                    tThis.addDart();
                }
            }
        },tThis);
    },
    addEnemy: function(){
        //TODO 在时时更新函数中判断，如果屏幕中敌人数量超过5个就不暂时不再出现新敌人
        if (this._flagStart == true){
            this.enemy = new EnemyAnimate();
            //敌人开始下落时候的X坐标
            var x = this._enemyPositions[Math.ceil(Math.random() * 3) - 1];
            var y = this.size.height - 65;
            this.enemy.attr({
                width: 50,
                height : 66,
                x: 0,
                y: y,
                anchor:0.5
            });
            this.addChild(this.enemy,2);
            var moveRun = new cc.MoveTo(x / this._enemyPositions[this._length - 1] * this._time,cc.p(x,y));
            var random = Math.random();
            //下落时间在4~8秒之间
            var moveDown = new cc.MoveTo(random > 0.5 ? random * this._downTimeMin * 2 : this._downTimeMin,cc.p(x,-this.enemy.height / 2));
            this.enemy.runAction(new cc.Sequence(moveRun,moveDown));
            //如果有单独美工就更好了，可以在敌人下落时候给他的头骨上增加一个直升机的翅膀，既不单调又有趣且吸引眼球
        }
        /*
        var enemyMove = new cc.MoveTo(5,cc.p(Math.random()*(maxX - minX)+minX, -this.enemy.getContentSize().height / 2));
        var removeEnemy = new cc.callFunc(this.removeEnemy,this);
        this.enemy.runAction(new cc.Sequence(enemyMove,removeEnemy));
        this.enemy.setTag(1);
        this._enemies.push(this.enemy);*/
    },
    addDart: function(){
        //子弹位置
        this.dart = new cc.Sprite(res.dart);
        this.heroAnimatePosition = this.heroAnimate.getPosition();
        this.dart.attr({
            x: this.heroAnimatePosition.x - this.dart.width / 2,
            y: this.heroAnimatePosition.y - 30
        });
        this.addChild(this.dart,0);
        //动作和时间
        this.dartMove = new cc.MoveTo(1, cc.p(-this.dart.width / 2,this.heroAnimatePosition.y - 30));
        var removeDart = new cc.callFunc(this.removeDart,this);
        this.dart.runAction(new cc.Sequence(this.dartMove,removeDart));
        //为子弹添加标志
        this.dart.setTag(1);
        this._darts.push(this.dart);
        //TODO 在时时更新函数中判断，如果飞镖数量超过5那么就不发能再发出
    },
    removeDart: function(dart){
        this.removeChild(dart,this);
        if (dart.getTag() == 1) {
            var index = this._darts.indexOf(dart);
            if (index > -1) {
                this._darts.splice(dart,1);
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
