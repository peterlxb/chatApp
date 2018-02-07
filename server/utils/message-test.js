const expect = require('chai').expect;

var {generateMessage}  = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var message = generateMessage("peter","It should work");
        
        expect(message).to.be.an('object');
        expect(message["from"]).to.be.include;
        expect(message["text"]).to.be.include;
        expect(message["createdAt"]).to.be.a('number');
    });
});