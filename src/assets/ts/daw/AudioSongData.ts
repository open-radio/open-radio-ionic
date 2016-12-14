export { AudioSongData };

class AudioSongData {
  private audioCtx
  constructor() {
    this.audioCtx = new AudioContext;
  }
  getAudioCtx() {
    return this.audioCtx;
  }
}
