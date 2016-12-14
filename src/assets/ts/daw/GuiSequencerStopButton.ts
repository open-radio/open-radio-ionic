import { stopSongService } from './StopSongService.ts';
const image = new Image();
image.src = '/assets/images/stop_icon.jpg';

export { GuiSequencerStopButton };

class GuiSequencerStopButton {
  private x
  private y
  private width
  private height
  private guiSongData
  private audioTracks
  constructor(guiSongData, audioTracks) {
    this.x = 0;
    this.y = 0;
    this.width = 90;
    this.height = 90;
    this.guiSongData = guiSongData;
    this.audioTracks = audioTracks;
  }

  draw() {
    this.guiSongData.getCanvasCtx().drawImage(image, this.x, this.y, this.width, this.height);
  }

  mouseWasClicked(mouseX, mouseY) {
    if (mouseX >= this.x && mouseX <= (this.x + this.width) && mouseY >= this.y && mouseY <= (this.y + this.height)) {
      stopSongService(this.audioTracks);
      this.guiSongData.setIsPlaying(false);
    }
  }
}
