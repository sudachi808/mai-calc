/**
 * 電卓箱コントローラ
 */
angular.module('app', [])
.controller('CalcBoxController', function($element) {
    var self = this;
    self.toggleOpen = function() {
        console.log('toggleOpen', $element.toggleClass('calc-box-open'));
    };
});
