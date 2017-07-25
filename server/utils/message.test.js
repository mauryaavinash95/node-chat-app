const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'abc';
        var text = 'this is text';
        var res = generateMessage(from, text);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, text });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var lat = 1;
        var long = 2;
        var url = 'https://www.google.com/maps?q=1,2';
        var res = generateLocationMessage(from, lat, long);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, url })
    });
});