var validation = require('./validation');
const expect = require('expect');
var isRealString = validation.isRealString;

describe('isRealString', () => {
    it('should reject non-string value', () => {
        var res = isRealString(99);
        expect(res).toBe(false);
    });

    it('should reject string with spaces', () => {
        var res = isRealString('     ');
        expect(res).toBe(false);
    });

    it('should accept a valid string parameter', ()=>{
        var res = isRealString('Hello');
        expect(res).toBe(true);
    })

})
