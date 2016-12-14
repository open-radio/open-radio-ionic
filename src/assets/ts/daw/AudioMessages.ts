import { AudioMessage }  from './AudioMessage.ts';

export { AudioMessages }

class AudioMessages {
  private audioMessages;
  private guiSongData;
  private audioTrack;

  constructor(guiSongData, audioTrack) {
    this.audioMessages = [];
    this.guiSongData = guiSongData;
    this.audioTrack = audioTrack;
  }

  resetTempo() {
    this.audioMessages.forEach((audioMessage, position) => this.createAudioMessage(position));
  }
  createAudioMessage(position) {
    // duration (in sec) is the smallest amount of time a loop can play for
    const duration = 60 / (this.guiSongData.getTempo() * this.guiSongData.getDivisionsOfBeat());

    // when (in sec) is the time from when play is pressed to when the audio is heard
    const when = duration * position;

    // offset (in sec) is how far into the loop the audio should start playing - % = remainder
    const offset = when % this.audioTrack.getAudioBufferDuration();

    // postion is location where a user clicked on the track
    this.audioMessages[position] = new AudioMessage(when, offset, duration);
  }
  removeAudioMessage(position) {
    delete this.audioMessages[position];
  }
  getAudioMessage(position) {
    return this.audioMessages[position];
  }
  getAudioMessages() {
    return this.audioMessages;
  }
}
