/**
 * 電卓箱コントローラ
 */
angular.module('app', [])
.controller('CalcBoxController', function($element) {

    var self = this;

    self.items = [];

    self.toggleOpen = function() {
        $element.toggleClass('calc-box-open');
    };

    self.clickBtn = function(event, index) {
        self.items[index].sticked = true;
    };

    /**
     * コンストラクタ
     */
    (function(){
        for (var i = 0 ; i < 4 * 5 ; i++) {
            self.items.push({ sticked : false });
        }
    })();
});
