const AudioTrack = require('../../AudioTrack');
const GuiSongData = require('../../GuiSongData');
// eslint-disable-next-line no-unused-vars
const should = require('should');
// eslint-disable-next-line no-unused-vars
const sinon = require('sinon');


describe('AudioTrack', () => {
  describe('#getAudioBufferDuration()', () => {
    it('should return duration value of audioBuffer', (done) => {
      const stubGuiSongData = {};
      const stubAudioBuffer = { duration: 42 };
      const audioTrack = new AudioTrack(stubGuiSongData, stubAudioBuffer);
      audioTrack.getAudioBufferDuration().should.eql(42);
      done();
    });
  });
  describe('#getAudioBuffer()', () => {
    it('should return audioBuffer object', (done) => {
      const stubGuiSongData = {};
      const stubAudioBuffer = {};
      const audioTrack = new AudioTrack(stubGuiSongData, stubAudioBuffer);
      audioTrack.getAudioBuffer().should.eql({});
      done();
    });
  });
  describe('#createPlayAudioMessage() and #getAudioMessage()', () => {
    // eslint-disable-next-line max-len
    it('should use createAudioMessage, then use getAudioMessage to get that AudioMessage', (done) => {
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').exactly(1).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').exactly(1).returns(8);
      const stubAudioBuffer = { };
      const audioTrack = new AudioTrack(mockGuiSongData.object, stubAudioBuffer);
      audioTrack.createPlayAudioMessage(0);
      // eslint-disable-next-line max-len
      audioTrack.getPlayAudioMessage(0).should.have.properties('getDuration', 'getWhen', 'getOffset');
      done();
    });
  });
  describe('#removePlayAudioMessage() and #getAudioMessage()', () => {
    // eslint-disable-next-line max-len
    it('should use createAudioMessage, then use removeAudioMessage to delete that AudioMessage', (done) => {
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').exactly(1).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').exactly(1).returns(8);
      const stubAudioBuffer = { };
      const audioTrack = new AudioTrack(mockGuiSongData.object, stubAudioBuffer);
      audioTrack.createPlayAudioMessage(0);
      audioTrack.removePlayAudioMessage(0);
      should.not.exist(audioTrack.getPlayAudioMessage(0));
      done();
    });
  });
  describe('#getPlayAudioMessages()', () => {
    it('should use getPlayAudioMessages to get the AudioMessages', (done) => {
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').exactly(2).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').exactly(2).returns(8);
      const stubAudioBuffer = { };
      const audioTrack = new AudioTrack(mockGuiSongData.object, stubAudioBuffer);
      audioTrack.createPlayAudioMessage(0);
      audioTrack.createPlayAudioMessage(1);
      const playAudioMessages = audioTrack.getPlayAudioMessages();
      playAudioMessages.length.should.eql(2);
      done();
    });
  });
  describe('#createStopAudioNode(audioNode)', () => {
    it('should create stopAudioNode based on an audioNode', (done) => {
      const stubGuiSongData = {};
      const stubAudioBuffer = {};
      const audioTrack = new AudioTrack(stubGuiSongData, stubAudioBuffer);
      audioTrack.createStopAudioNode({});
      audioTrack.getStopAudioNodes()[0].should.eql({});
      done();
    });
  });
  describe('#getStopAudioNodes()', () => {
    it('should get all stopAudioNodes', (done) => {
      const stubGuiSongData = {};
      const stubAudioBuffer = {};
      const audioTrack = new AudioTrack(stubGuiSongData, stubAudioBuffer);
      audioTrack.createStopAudioNode({});
      audioTrack.createStopAudioNode({});
      audioTrack.getStopAudioNodes().length.should.eql(2);
      done();
    });
  });
  describe('#clearStopAudioNodes()', () => {
    it('should clear stopAudioNodes array', (done) => {
      const stubGuiSongData = {};
      const stubAudioBuffer = {};
      const audioTrack = new AudioTrack(stubGuiSongData, stubAudioBuffer);
      audioTrack.createStopAudioNode({});
      audioTrack.clearStopAudioNodes();
      audioTrack.getStopAudioNodes().should.eql([]);
      done();
    });
  });
});
