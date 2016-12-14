import { AudioMessage } from ('../../AudioMessage.ts');
// eslint-disable-next-line no-unused-vars
const should = require('should');

describe('AudioMessage', () => {
  describe('#getWhen()', () => {
    it('should return when value', (done) => {
      const audioMessage = new AudioMessage(1.0, 2.0, 3.0);
      audioMessage.getWhen().should.eql(1.0);
      done();
    });
  });
  describe('#getOffset()', () => {
    it('should return offset value', (done) => {
      const audioMessage = new AudioMessage(35.4, 35.5, 35.6);
      audioMessage.getOffset().should.eql(35.5);
      done();
    });
  });
  describe('#getDuration()', () => {
    it('should return duration value', (done) => {
      const audioMessage = new AudioMessage(27.9, 30.5, 24.2);
      audioMessage.getDuration().should.eql(24.2);
      done();
    });
  });
});
