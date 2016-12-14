const AudioSongData = require('../../AudioSongData');
// eslint-disable-next-line no-unused-vars
const should = require('should');


describe('AudioSongData', () => {
  describe('#getAudioCtx', () => {
    it('should return an audioCtx', (done) => {
      const audioSongData = new AudioSongData();
      const audioCtx = audioSongData.getAudioCtx();
      audioCtx.should.eql(new AudioContext());
      done();
    });
  });
  describe('#getAudioCtx()', () => {
    it('should not return a single share audioCtx between two "AudioSongData"s', (done) => {
      const audioSongData0 = new AudioSongData();
      const audioCtx0 = audioSongData0.getAudioCtx();
      const audioSongData1 = new AudioSongData();
      const audioCtx1 = audioSongData1.getAudioCtx();
      audioCtx0.should.not.equal(audioCtx1);
      done();
    });
  });
});
