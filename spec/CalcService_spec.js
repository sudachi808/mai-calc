/**
 * CalcService ユニットテスト
 */
describe('CalcService', function() {

    beforeEach(module('service'));

    var calc;

    beforeEach(inject(function(CalcService) {
       calc = CalcService;
    }));

    it('加算', function() {
        expect(calc.plus( 1,  1)).toEqual( 2);
        expect(calc.plus( 1, -1)).toEqual( 0);
        expect(calc.plus(-1, -1)).toEqual(-2);
        expect(calc.plus( 0,  1)).toEqual( 1);
        expect(calc.plus( 0, -1)).toEqual(-1);
        expect(calc.plus( 0,  0)).toEqual( 0);
    });

    it('減算', function() {
        expect(calc.minus( 1,  1)).toEqual( 0);
        expect(calc.minus( 1, -1)).toEqual( 2);
        expect(calc.minus(-1, -1)).toEqual( 0);
        expect(calc.minus( 0,  1)).toEqual(-1);
        expect(calc.minus( 0, -1)).toEqual( 1);
        expect(calc.minus( 0,  0)).toEqual( 0);
    });

    it('乗算', function() {
        expect(calc.multiple( 1,  1)).toEqual( 1);
        expect(calc.multiple( 1, -1)).toEqual(-1);
        expect(calc.multiple(-1, -1)).toEqual( 1);
        expect(calc.multiple( 0,  1)).toEqual( 0);
        expect(calc.multiple( 0, -1)).toEqual( 0);
        expect(calc.multiple( 0,  0)).toEqual( 0);
    });

    it('除算', function() {
        expect(calc.divide( 1,  1)).toEqual( 1);
        expect(calc.divide( 1, -1)).toEqual(-1);
        expect(calc.divide(-1, -1)).toEqual( 1);
        expect(calc.divide( 0,  1)).toEqual( 0);
        expect(calc.divide( 0, -1)).toEqual( 0);
        expect(function() {
            calc.divide(0, 0);
        }).toThrow('ZeroDivideException');
    });

});
