const expect = require('expect');
var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'abc';
        var text = 'this is text';
        var res = generateMessage(from, text);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, text});
    });
});