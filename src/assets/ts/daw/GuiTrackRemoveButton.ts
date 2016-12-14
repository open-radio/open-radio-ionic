const image = new Image();
image.src = '/assets/images/remove_icon.jpg';

export { GuiTrackRemoveButton };

class GuiTrackRemoveButton {
  private x
  private y
  private width
  private height
  private guiSongData
  private guiTrack

  constructor(guiSongData, guiTrack) {
    this.guiSongData = guiSongData;
    this.guiTrack = guiTrack;
    this.width = guiTrack.getREMOVE_BTN_WIDTH();
    this.height = 60;
  }

  setX() {
    this.x = this.guiSongData.getCanvasWidth() - 60;
  }
  setY() {
    this.y = this.guiTrack.getYTrackPosition() + 60;
  }

  draw() {
    this.setX();
    this.setY();
    this.guiSongData.getCanvasCtx().drawImage(image, this.x, this.y, this.width, this.height);
  }
  mouseWasClicked(mouseX, mouseY) {
    if (mouseX >= this.x && mouseX <= (this.x + this.width) && mouseY >= this.y && mouseY <= (this.y + this.height)) {
      this.guiTrack.removeSelf();
    }
  }
};
