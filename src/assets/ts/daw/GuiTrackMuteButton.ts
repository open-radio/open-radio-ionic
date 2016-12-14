const image = new Image();
image.src = '/assets/images/mute_icon.jpg';

export { GuiTrackMuteButton };

class GuiTrackMuteButton {
  private x;
  private y;
  private width;
  private height;
  private guiSongData;
  private guiTrack;

  constructor(guiSongData, guiTrack) {
    this.x = 0;
    this.width = guiTrack.getTRACK_CONTROL_BTNS_WIDTH();
    this.height = 60;
  }
  setY() {
    this.y = this.guiTrack.getYTrackPosition() + 60;
  }
  draw() {
    this.setY();
    this.guiSongData.getCanvasCtx().drawImage(image, this.x, this.y, this.width, this.height);
  }
  mouseWasClicked(mouseX, mouseY) {
    if (mouseX >= this.x && mouseX <= (this.x + this.width) && mouseY >= this.y && mouseY <= (this.y + this.height)) {
    }
  }
};
