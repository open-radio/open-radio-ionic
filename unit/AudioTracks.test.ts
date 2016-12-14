const sinon = require('sinon');
// eslint-disable-next-line no-unused-vars
const should = require('should');

const proxyquire = require('proxyquire');
const dummyAudioTrack = { name: 'AudioTrack' };
// eslint-disable-next-line no-unused-vars, max-len
const AudioTracks = proxyquire('../../AudioTracks', (guiSongData, audioSongData, guiTracks) => dummyAudioTrack);

const AudioSongData = require('../../AudioSongData');
const mockAudioSongData = sinon.mock(new AudioSongData());
mockAudioSongData.expects('getAudioCtx').atLeast(0).returns(new AudioContext());

describe('AudioTracks', () => {
  describe('#getAudioTracks()', () => {
    it('should return audioTracks', (done) => {
      const stubGuiSongData = {};
      // eslint-disable-next-line no-unused-vars
      const stubGuiTracks = { addTrack: (audioTrack, name) => undefined };
      const audioTracks = new AudioTracks(stubGuiSongData, mockAudioSongData.object, stubGuiTracks);
      audioTracks.getAudioTracks().should.eql([]);
      done();
    });
  });
  describe('#addTrack(id, name, url)', () => {
    it('should create a new Track', (done) => {
      const stubGuiSongData = {};
      // eslint-disable-next-line no-unused-vars
      const stubGuiTracks = { addTrack: (audioTrack, name) => undefined };
      const audioTracks = new AudioTracks(stubGuiSongData, mockAudioSongData.object, stubGuiTracks);
      const name = 'ashley';
      const id = '2';
      const url = 'http://localhost:9876/base/assets/ts/daw/test/files/test-beat.wav';
      audioTracks.addTrack(id, name, url);
      setTimeout(() => {
        audioTracks.getAudioTracks()[id].should.eql(dummyAudioTrack);
        done();
      }, 1000);
    });
  });
  describe('#removeAudioTrack(id)', () => {
    it('should remove a Track', (done) => {
      const stubGuiSongData = {};
      // eslint-disable-next-line no-unused-vars
      const stubGuiTracks = { addTrack: (audioTrack, name) => undefined };
      const audioTracks = new AudioTracks(stubGuiSongData, mockAudioSongData.object, stubGuiTracks);
      const name = 'ashley';
      const id = '2';
      const url = 'http://localhost:9876/base/assets/ts/daw/test/files/test-beat.wav';
      audioTracks.addTrack(id, name, url);
      setTimeout(() => {
        audioTracks.removeAudioTrack(id);
        should.not.exist(audioTracks.getAudioTracks()[id]);
        done();
      }, 1000);
    });
  });
  describe('#getAudioTrack(id)', () => {
    it('should return audioTrack at id', (done) => {
      const stubGuiSongData = {};
      // eslint-disable-next-line no-unused-vars
      const stubGuiTracks = { addTrack: (audioTrack, name) => undefined };
      const audioTracks = new AudioTracks(stubGuiSongData, mockAudioSongData.object, stubGuiTracks);
      const name = 'ashley';
      const id = '2';
      const url = 'http://localhost:9876/base/assets/ts/daw/test/files/test-beat.wav';
      audioTracks.addTrack(id, name, url);
      setTimeout(() => {
        audioTracks.getAudioTrack(id).should.eql(audioTracks.getAudioTracks()[id]);
        done();
      }, 1000);
    });
  });
});
