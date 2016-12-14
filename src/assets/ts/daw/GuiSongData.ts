export { GuiSongData }

class GuiSongData {
  private isPlaying
  private tempo
  private divisionsOfBeat
  private canvas

  constructor() {
    this.isPlaying = false;
    this.tempo = 120;
    this.divisionsOfBeat = 8;
    this.canvas = (<HTMLCanvasElement>document.getElementById('sequencerCanvas'));
  }

  setIsPlaying(isPlaying) {
    this.isPlaying = isPlaying;
  }
  getIsPlaying() {
    return this.isPlaying;
  }

  setTempo(tempo) {
    this.tempo = tempo;
  }
  getTempo() {
    return this.tempo;
  }

  setDivisionsOfBeat (divisionsOfBeat) {
    this.divisionsOfBeat = divisionsOfBeat;
  };
  getDivisionsOfBeat() {
    return this.divisionsOfBeat;
  }

  getCanvasCtx() {
    return this.canvas.getContext('2d');
  }
  getCanvasHeight() {
    return this.canvas.height;
  }
  getCanvasWidth() {
    return this.canvas.width;
  }
}
