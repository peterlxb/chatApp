const expect = require('chai').expect;

var {generateMessage,generateLocationMessage}  = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var message = generateMessage("peter","It should work");

        expect(message).to.be.an('object');
        expect(message["from"]).to.be.include;
        expect(message["text"]).to.be.include;
        expect(message["createdAt"]).to.be.a('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location  object', () => {
        var message = generateLocationMessage("peter", -0.789275, 113.92132699999999 );

        expect(message).to.be.an('object');
        expect(message["from"]).to.be.include;
        expect(message["url"]).to.be.include;
        expect(message["createdAt"]).to.be.a('number');
    });
});