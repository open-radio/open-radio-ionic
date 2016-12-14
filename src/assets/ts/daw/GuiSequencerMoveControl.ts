const image = new Image();
image.src = '/assets/images/swipe_icon.png';
export { GuiSequencerMoveControl };

class GuiSequencerMoveControl {
  private width
  private height
  private x
  private y
  private guiSongData
  private guiTracks

  constructor(guiSongData, guiTracks) {
    this.width = 90;
    this.height = 90;
    this.y = 0;
    this.guiSongData = guiSongData;
    this.guiTracks = guiTracks;
  }

  setX() {
    this.x = this.guiSongData.getCanvasWidth() - this.width;
  }
  draw() {
    this.setX();
    this.guiSongData.getCanvasCtx().drawImage(image, this.x, this.y, this.width, this.height);
  }
  mouseWasClicked(mouseX, mouseY) {
    if (mouseX >= this.x && mouseX <= (this.x + this.width) && mouseY >= this.y && mouseY <= (this.y + this.height)) {
      // swipe up
      // eslint-disable-next-line max-len
      if (mouseY < 30 && mouseX > this.guiSongData.getCanvasWidth() - 60 && mouseX < this.guiSongData.getCanvasWidth() - 30) {
        this.guiTracks.decrementTrackBedYPosition();
        this.guiTracks.draw();

      // swipe down
      // eslint-disable-next-line max-len
      } else if (mouseY > 60 && mouseX > this.guiSongData.getCanvasWidth() - 60 && mouseX < this.guiSongData.getCanvasWidth() - 30) {
        this.guiTracks.incrementTrackBedYPosition();
        this.guiTracks.draw();

      // swipe left
      // eslint-disable-next-line max-len
      } else if (mouseX < this.guiSongData.getCanvasWidth() - 60 && mouseX > this.guiSongData.getCanvasWidth() - 90 && mouseY < 90 && mouseY > 30) {
        this.guiTracks.decrementTimelineXPosition();
        this.guiTracks.draw();

      // swipe right
      } else if (mouseX > this.guiSongData.getCanvasWidth() - 30 && mouseY < 90 && mouseY > 30) {
        this.guiTracks.incrementTimelineXPosition();
        this.guiTracks.draw();
      }
    }
  };
};
