import * as AudioTrack from './AudioTrack.ts';

export { AudioTracks };

class AudioTracks {
  private audioTracks;
  private guiSongData;
  private audioSongData;
  private guiTracks;

  constructor(guiSongData, audioSongData, guiTracks) {
    this.audioTracks = [];
    this.guiSongData = guiSongData;
    this.audioSongData = audioSongData;
    this.guiTracks = guiTracks;
  }
  addTrack(id, name, url) {
    // Requesting And Decoding the Audio Data
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      const audioData = request.response;
      this.audioSongData.getAudioCtx().decodeAudioData(audioData, (audioBuffer) => {
        this.audioTracks[id] = new AudioTrack(this.guiSongData, audioBuffer);
        this.guiTracks.addTrack(this.audioTracks[id], name);
      }, (e) => { throw e; });
    };
    request.send();
  };

  // Using Unique Id For Array Index
  removeAudioTrack(id){
    delete this.audioTracks[id];
  }

  getAudioTracks() {
    return this.audioTracks;
  }
  getAudioTrack(id) {
    return this.audioTracks[id];
  }
};
