import { AudioMessages } from './AudioMessages.ts';

export { AudioTrack };

class AudioTrack {
  private playAudioMessages;
  private stopAudioNodes;
  private guiSongData;
  private audioBuffer;

  constructor(guiSongData, audioBuffer) {
    this.playAudioMessages = new AudioMessages(guiSongData, this);
    this.stopAudioNodes = [];
    this.guiSongData = guiSongData;
    this.audioBuffer = audioBuffer;
  }

  getAudioBufferDuration() {
    return this.audioBuffer.duration;
  }
  getAudioBuffer() {
    return this.audioBuffer;
  }
  getPlayAudioMessage(position) {
    return this.playAudioMessages.getAudioMessage(position);
  }
  createPlayAudioMessage (position) {
    this.playAudioMessages.createAudioMessage(position);
  }
  removePlayAudioMessage (position) {
    this.playAudioMessages.removeAudioMessage(position);
  }
  getPlayAudioMessages () {
    return this.playAudioMessages.getAudioMessages();
  }
  createStopAudioNode (audioNode) {
    this.stopAudioNodes.push(audioNode);
  }
  getStopAudioNodes () {
    return this.stopAudioNodes;
  }
  clearStopAudioNodes () {
    this.stopAudioNodes = [];
  };
};
