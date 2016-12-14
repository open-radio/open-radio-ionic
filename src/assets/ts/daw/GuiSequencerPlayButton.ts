import { playSongService } from './PlaySongService.ts';
const image = new Image();
image.src = '/assets/images/play_icon.jpg';
export { GuiSequencerPlayButton }

class GuiSequencerPlayButton {
  private x
  private y
  private width
  private height
  private guiSongData
  private audioSongData
  private audioTracks

  constructor(guiSongData, audioSongData, audioTracks) {
    this.x = 90;
    this.y = 0;
    this.width = 90;
    this.height = 90;
    this.guiSongData = guiSongData;
    this.audioSongData = audioSongData;
    this.audioTracks = audioTracks;
  }

  draw() {
    this.guiSongData.getCanvasCtx().drawImage(image, this.x, this.y, this.width, this.height);
  }
  mouseWasClicked (mouseX, mouseY) {
    if (mouseX >= this.x && mouseX <= (this.x + this.width) && mouseY >= this.y && mouseY <= (this.y + this.height)) {
      if (!this.guiSongData.getIsPlaying()) {
        this.guiSongData.setIsPlaying(true);
        playSongService(this.audioSongData, this.audioTracks);
      }
    }
  }
};
