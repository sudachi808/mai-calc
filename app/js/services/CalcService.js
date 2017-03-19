/**
 * 電卓サービス
 */
angular.module('service', [])
.factory('CalcService', function() {

    var self = this;

    // TODO: 計算結果の有効数字への丸め処理？（iOSの電卓は有効数字を考慮していない模様）
    // TODO: 最大表示桁数を超えた場合の仕様（切り捨て？四捨五入？）

    //
    // XXX:
    // KARMAでのユニットテストにて。。。
    // ゼロ(0)を負数で乗算or除算すると、マイナスゼロ(-0)になってしまう。なんで！？
    // この(-0)と(0)を Jasmine の toEqual() で比較すると false になる...
    // ユニットテストが通らないので、ひとまず parseFloat で回避したが、謎の挙動。
    //

    self.execute = function(val_1, val_2, operator) {
        if (isNaN(val_1) || isNaN(val_2)) {
            throw 'InvalidValueException';
        }
        val_1 = Number(val_1);
        val_2 = Number(val_2);
        switch (operator) {
            case '+':
                return val_1 + val_2;
            case '-':
                return val_1 - val_2;
            case '*':
                return parseFloat(val_1 * val_2);
            case '/':
                if (val_2 === 0) {
                    throw 'ZeroDivideException';
                }
                return parseFloat(val_1 / val_2);
            default:
                throw 'UnknownOperatorException';
        }
    };

    return {
        execute : function(val_1, val_2, operator) {
            return self.execute(val_1, val_2, operator);
        },
        /**
         * 加算
         */
        plus : function(val_1, val_2) {
            return self.execute(val_1, val_2, '+');
        },
        /**
         * 減算
         */
        minus : function(val_1, val_2) {
            return self.execute(val_1, val_2, '-');
        },
        /**
         * 乗算
         */
        multiple : function(val_1, val_2) {
            return self.execute(val_1, val_2, '*');
        },
        /**
         * 除算
         */
        divide : function(val_1, val_2) {
            return self.execute(val_1, val_2, '/');
        },
        /**
         * TODO: 指数計算
         */
        power : function(val_1, val_2) {
            throw 'Implement Me!';
        }
    };
});
