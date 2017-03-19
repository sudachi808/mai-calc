/**
 * 電卓サービス
 */
angular.module('service', [])
.factory('CalcService', function() {

    var self = this;

    self.answer = 0;

    // TODO: 計算結果の有効数字への丸め処理？（iOSの電卓は有効数字を考慮していない模様）
    // TODO: 最大表示桁数を超えた場合の仕様（切り捨て？四捨五入？）

    return {
        /**
         * 加算
         */
        plus : function(val_1, val_2) {
            return val_1 + val_2;
        },
        /**
         * 減算
         */
        minus : function(val_1, val_2) {
            return val_1 - val_2;
        },
        /**
         * 乗算
         */
        multiple : function(val_1, val_2) {
            //
            // XXX: 0 * (-1) だと (0) ではなくて (-0) になってユニットテストがNGになる。なんで！？
            //
            return parseFloat(val_1 * val_2);
        },
        /**
         * 除算
         */
        divide : function(val_1, val_2) {
            if (val_2 == 0) {
                throw 'ZeroDivideException';
            }
            //
            // XXX: 0 / (-1) だと (0) ではなくて (-0) になってユニットテストがNGになる。なんで！？
            //
            return parseFloat(val_1 / val_2);
        },
        /**
         * TODO: 指数計算
         */
        power : function(val_1, val_2) {
            throw 'Implement Me!';
        },
        /**
         * 結果
         */
        answer : self.answer
    };
});
