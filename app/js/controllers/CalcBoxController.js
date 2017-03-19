/**
 * 電卓箱コントローラ
 */
angular.module('app', ['service', 'psForceTouchEvents'])
.controller('CalcBoxController', ['$element', 'CalcService', function($element, CalcService) {

    var self = this;

    self.items = [];
    self.calc  = CalcService;

    /**
     * 状態初期化
     * @return {void}
     */
    self._init = function() {
        self.value_1 = null;
        self.value_2 = null;
        self.operator = null;
        self.answer = 0;
        self.monitor = {
            value: 0,
            operator: null
        };
        self.error = null;
    };

    /**
     * TODO: シウマイを剥がす
     */

    /**
     * 箱のフタを開閉
     * @return {void}
     */
    self.toggleOpen = function() {
        $element.toggleClass('calc-box-open');
    };

    /**
     * 電卓の各ボタンクリックハンドラ
     * @param  {$event}
     * @param  {number} ボタン位置
     * @return {void}
     */
    self.onClick = function(event, index) {

        var btn = angular.element(event.currentTarget);

        var index = btn.attr('index');
        var role  = btn.attr('role');
        var value = btn.attr('value');
        var text  = btn.text();

        switch (role) {
            case 'number':
                self._onNumber(value);
                break;
            case 'operator':
                self._onOperator(value, text);
                break;
            case 'point':
                self._onPoint();
                break;
            case 'execute':
                self._onExecute();
                break;
            case 'clear':
                self._onClear();
                break;
            default:
                return;
        }
    };

    /**
     * 数字選択
     * @return {void}
     */
    self._onNumber = function(value) {
        if (self.operator === null) {
            if (self.value_1 === null) {
                self.value_1 = '';
            }
            self.value_1 += value;
            self.monitor.value = self.value_1;
        } else {
            if (self.value_2 === null) {
                self.value_2 = '';
            }
            self.value_2 += value;
            self.monitor.value = self.value_2;
        }
    };

    /**
     * 小数点選択
     * @return {void}
     */
    self._onPoint = function() {

    };

    /**
     * 演算子選択
     * @return {void}
     */
    self._onOperator = function(value, text) {
        if (self.value_2 !== null) {
            //
            // すでに value_2 が入力されている状態で、演算子が選択された場合、
            // いったん計算を実行して、結果を value_1 にセットする。
            //
            self._onExecute();
            self.value_1 = self.answer;
        }
        self.operator = value;
        self.monitor.operator = text;
    };

    /**
     * 計算実行
     * @return {void}
     */
    self._onExecute = function() {
        try {
            if (self.value_1 === null && self.value_2 === null) {
                //
                // value_1、value_2 ともに未入力の場合はなにもしない。
                //
                return;
            }
            if (self.value_1 === null) {
                //
                // value_1 が未入力の場合、ゼロが入力されているものとみなす。
                // ※直前の計算結果が value_1 に保持されるので、初回起動時 or クリア直後のみ。
                //
                // 例)
                //   [+][5][=] ---> 0 + 5 = 5
                //   [*][5][=] ---> 0 * 5 = 0
                //
                self.value_1 = 0;
            }
            if (self.value_2 === null) {
                //
                // value_2 が未入力の場合、value_1 の値が value_2 にも入力されているものとみなす。
                //
                // 例)
                //   [6][+][=] ---> 6 + 6 = 12
                //   [6][*][=] ---> 6 * 6 = 36
                //
                self.value_2 = self.value_1;
            }

            var answer;

            var value_1 = Number(self.value_1);
            var value_2 = Number(self.value_2);

            switch (self.operator) {
                case '+':
                case '-':
                case '*':
                case '/':
                    answer = self.calc.execute(self.value_1, self.value_2, self.operator);
                    break;
                default:
                    throw 'UnknownOperatorException';
            }
            self._init();
            self.monitor.value = answer;
            self.answer = answer;
        } catch(e) {
            self._init();
            self.error = e;
            console.log(e);
        }
    };

    /**
     * クリア
     * @return {void}
     */
    self._onClear = function() {
        self._init();
    };

    /**
     * 感圧タッチ開始
     * @param {$event}
     * @param {index}  ボタン位置
     * @return {void}
     */
    self.onForceTouchStart = function(event, index) {
        self.onClick(event, index);
    };

    /**
     * 感圧タッチ圧力変更
     * @param {$event}
     * @param {number} タッチ圧力
     * @param {index}  ボタン位置
     * @return {void}
     */
    self.onForceTouch = function(event, force, index) {
        if (force === 1) {
            console.log('STICK!', index, force);
            // シウマイ貼り付け
            self.items[index].sticked = true;
        }
        // TODO: グリンピース貼り付け
    };

    /**
     * コンストラクタ
     */
    (function(){
        self._init();
        for (var i = 0 ; i < 4 * 5 ; i++) {
            self.items.push({ sticked : false });
        }
    })();
}]);
