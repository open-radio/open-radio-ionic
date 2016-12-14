const image = new Image();
image.src = '/assets/images/zoom_out_icon.png';

export { GuiSequencerZoomOutButton };

class GuiSequencerZoomOutButton{
  private width
  private height
  private x
  private y
  private guiSongData
  private guiTracks

  constructor(guiSongData, guiTracks) {
    this.width = 45;
    this.height = 45;
    this.y = 45;
    this.guiSongData = guiSongData;
    this.guiTracks = guiTracks;
  }

  setX() {
    this.x = this.guiSongData.getCanvasWidth() - this.width - 90;
  }
  draw() {
    this.setX();
    this.guiSongData.getCanvasCtx().drawImage(image, this.x, this.y, this.width, this.height);
  }
  mouseWasClicked(mouseX, mouseY) {
    if (mouseX >= this.x && mouseX <= (this.x + this.width) && mouseY >= this.y && mouseY <= (this.y + this.height)) {
      this.guiTracks.incrementZoomLevel();
      this.guiTracks.draw();
    }
  }
};
