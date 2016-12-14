import { GuiTrack }  from './GuiTrack.ts';

export { GuiTracks }

class GuiTracks {
  private TRACK_HEIGHT = 180;
  private guiTracks;
  private zoomLevel;
  private nextTrackNumber;
  private timelineXPosition;
  private trackBedYPosition;
  private guiSongData;

  constructor(guiSongData) {
    this.guiTracks = [];
    this.zoomLevel = 5;
    this.nextTrackNumber = 0;
    this.timelineXPosition = 0;
    this.trackBedYPosition = 0;
    this.guiSongData = guiSongData;
  }

  incrementZoomLevel() {
    this.zoomLevel+=1;
  }
  decrementZoomLevel() {
    if (this.zoomLevel < 1) {
      this.zoomLevel = 0;
    } else {
      this.zoomLevel-=1;
    }
  }
  getZoomLevel() {
    return this.zoomLevel;
  }

  getTRACK_HEIGHT() {
    return this.TRACK_HEIGHT;
  }

  getGuiTracks() {
    return this.guiTracks;
  }

  incrementTimelineXPosition() {
    this.timelineXPosition+=1;
  }
  decrementTimelineXPosition = () => {
    if (this.timelineXPosition < 1) {
      this.timelineXPosition = 0;
    } else {
      this.timelineXPosition-=1;
    }
  }

  getTimelineXPosition() {
    return this.timelineXPosition;
  }

  incrementTrackBedYPosition() {
    this.trackBedYPosition+=1;
    if (this.trackBedYPosition >= this.nextTrackNumber) {
      this.trackBedYPosition = this.nextTrackNumber - 1;
    }
  }

  decrementTrackBedYPosition = () => {
    if (this.trackBedYPosition < 1) {
      this.trackBedYPosition = 0;
    } else {
      this.trackBedYPosition-=1;
    }
  }
  getTrackBedYPosition() {
    return this.trackBedYPosition;
  }

  removeTrack(removedTrackNumber) {
    delete this.guiTracks[removedTrackNumber];
    this.nextTrackNumber-=1;
    for (let i = removedTrackNumber; i < this.nextTrackNumber; i++) {
      this.guiTracks[i] = this.guiTracks[i + 1];
    }
    delete this.guiTracks[this.nextTrackNumber];
    this.draw();
  }

  draw() {
    const tracksToDraw = this.guiTracks.filter((guiTrack, number) => number >= this.trackBedYPosition);
    this.clear();
    tracksToDraw.forEach((guiTrack, yTrackIndex) => guiTrack.draw(yTrackIndex));
  }

  addTrack = (audioTrack, name) => {
    // eslint-disable-next-line max-len
    this.guiTracks[this.nextTrackNumber] = new GuiTrack(this.guiSongData, this, audioTrack, this.nextTrackNumber, name);
    this.nextTrackNumber+=1;
  }
  clear() {
    // eslint-disable-next-line no-param-reassign
    this.guiSongData.getCanvasCtx().fillStyle = '#f5f5f5';
    this.guiSongData.getCanvasCtx().beginPath();
    // eslint-disable-next-line max-len
    this.guiSongData.getCanvasCtx().rect(0, 90, this.guiSongData.getCanvasWidth(), this.guiSongData.getCanvasHeight());
    this.guiSongData.getCanvasCtx().fill();
  }
};
