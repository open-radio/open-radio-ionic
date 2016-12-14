const AudioMessages = require('../../AudioMessages');
const GuiSongData = require('../../GuiSongData');
const AudioTrack = require('../../AudioTrack');
// eslint-disable-next-line no-unused-vars
const should = require('should');
const sinon = require('sinon');

describe('AudioMessages', () => {
  describe('#resetTempo()', () => {
    it('should recreate each AudioMessage of the array with a new tempo', (done) => {
      // a bunch of AudioMessage values
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').exactly(2).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').exactly(4).returns(8);

      const mockAudioTrack = sinon.mock(new AudioTrack());
      mockAudioTrack.expects('getAudioBufferDuration').exactly(4).returns(5);
      const audioMessages = new AudioMessages(mockGuiSongData.object, mockAudioTrack.object);

      audioMessages.createAudioMessage(0);
      audioMessages.createAudioMessage(1);
      const duration0 = audioMessages.getAudioMessage(0).getDuration();
      const duration1 = audioMessages.getAudioMessage(1).getDuration();
      mockGuiSongData.expects('getTempo').exactly(2).returns(60);
      audioMessages.resetTempo();

      audioMessages.getAudioMessage(0).getDuration().should.be.eql(duration0 * 2);
      audioMessages.getAudioMessage(1).getDuration().should.be.eql(duration1 * 2);
      done();
    });
    it('should recreate each AudioMessage of the array with new divisionsOfBeat', (done) => {
      // a bunch of AudioMessage values
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').exactly(4).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').exactly(2).returns(8);

      const mockAudioTrack = sinon.mock(new AudioTrack());
      mockAudioTrack.expects('getAudioBufferDuration').exactly(4).returns(5);
      const audioMessages = new AudioMessages(mockGuiSongData.object, mockAudioTrack.object);

      audioMessages.createAudioMessage(0);
      audioMessages.createAudioMessage(1);
      const duration0 = audioMessages.getAudioMessage(0).getDuration();
      const duration1 = audioMessages.getAudioMessage(1).getDuration();
      mockGuiSongData.expects('getDivisionsOfBeat').exactly(2).returns(4);
      audioMessages.resetTempo();

      audioMessages.getAudioMessage(0).getDuration().should.be.eql(duration0 * 2);
      audioMessages.getAudioMessage(1).getDuration().should.be.eql(duration1 * 2);
      done();
    });
  });
  describe('#createAudioMessage(position)', () => {
    it('should create a new AudioMessage and store it at position', (done) => {
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').atLeast(1).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').atLeast(1).returns(8);

      const mockAudioTrack = sinon.mock(new AudioTrack());
      mockAudioTrack.expects('getAudioBufferDuration').atLeast(1).returns(5);
      const audioMessages = new AudioMessages(mockGuiSongData.object, mockAudioTrack.object);

      audioMessages.createAudioMessage(3);
			// eslint-disable-next-line max-len
      audioMessages.getAudioMessage(3).should.have.properties('getWhen', 'getOffset', 'getDuration');
      done();
    });
  });
  describe('#removeAudioMessage(position)', () => {
    it('should delete AudioMessage at position', (done) => {
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').atLeast(1).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').atLeast(1).returns(8);

      const mockAudioTrack = sinon.mock(new AudioTrack());
      mockAudioTrack.expects('getAudioBufferDuration').atLeast(1).returns(5);
      const audioMessages = new AudioMessages(mockGuiSongData.object, mockAudioTrack.object);

      audioMessages.createAudioMessage(4);
      audioMessages.removeAudioMessage(4);
      should.not.exist(audioMessages.getAudioMessage(4));
      done();
    });
  });
  describe('#getAudioMessage(position)', () => {
    it('should return AudioMessage at position in AudioMessages array', (done) => {
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').atLeast(1).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').atLeast(1).returns(8);

      const mockAudioTrack = sinon.mock(new AudioTrack());
      mockAudioTrack.expects('getAudioBufferDuration').atLeast(1).returns(5);
      const audioMessages = new AudioMessages(mockGuiSongData.object, mockAudioTrack.object);
      audioMessages.createAudioMessage(2);
			// eslint-disable-next-line max-len
      audioMessages.getAudioMessage(2).should.have.properties('getWhen', 'getOffset', 'getDuration');
      done();
    });
    it('should return undefined if no AudioMessages at position in array', (done) => {
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').atLeast(1).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').atLeast(1).returns(8);

      const mockAudioTrack = sinon.mock(new AudioTrack());
      mockAudioTrack.expects('getAudioBufferDuration').atLeast(1).returns(5);
      const audioMessages = new AudioMessages(mockGuiSongData.object, mockAudioTrack.object);
			// eslint-disable-next-line max-len
      should.not.exist(audioMessages.getAudioMessage(1));
      done();
    });
  });
  describe('#getAudioMessages()', () => {
    it('should return all "AudioMessage"s in array', (done) => {
      const mockGuiSongData = sinon.mock(new GuiSongData());
      mockGuiSongData.expects('getTempo').atLeast(1).returns(120);
      mockGuiSongData.expects('getDivisionsOfBeat').atLeast(1).returns(8);

      const mockAudioTrack = sinon.mock(new AudioTrack());
      mockAudioTrack.expects('getAudioBufferDuration').atLeast(1).returns(5);
      const audioMessages = new AudioMessages(mockGuiSongData.object, mockAudioTrack.object);
      audioMessages.createAudioMessage(0);
      audioMessages.createAudioMessage(1);
      const audioMessagesArray = audioMessages.getAudioMessages();
      should.exist(audioMessagesArray[0]);
      should.exist(audioMessagesArray[1]);
      done();
    });
  });
});
