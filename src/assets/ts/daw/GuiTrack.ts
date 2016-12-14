import { GuiTrackRecordButton } from './GuiTrackRecordButton.ts';
import { GuiTrackMuteButton } from './GuiTrackMuteButton.ts';
import { GuiTrackRemoveButton } from './GuiTrackRemoveButton.ts';
import { GuiTrackSoloButton } from './GuiTrackSoloButton.ts';

export { GuiTrack };

// eslint-disable-next-line max-len
class GuiTrack {
  private TRACK_CONTROL_BTNS_WIDTH = 60;
  private REMOVE_BTN_WIDTH = 60;
  private TICK_WIDTH = 60;
  private SEQUENCER_CONTROL_BTNS_HEIGHT = 90;
  private yTrackPosition;
  private yTrackIndex;
  private colorToggle;
  private trackButtons;
  private guiSongData;
  private guiTracks;
  private audioTrack;
  private trackNumber;
  private label;

  constructor(guiSongData, guiTracks, audioTrack, trackNumber, label) {
    this.colorToggle = [];
    this.trackButtons = [];
    this.guiSongData = guiSongData;
    this.guiTracks = guiTracks;
    this.audioTrack = audioTrack;
    this.trackNumber = trackNumber;
    this.label = label;

    this.trackButtons.push(new GuiTrackRecordButton(this.guiSongData, this));
    this.trackButtons.push(new GuiTrackMuteButton(this.guiSongData, this));
    this.trackButtons.push(new GuiTrackRemoveButton(this.guiSongData, this));
    this.trackButtons.push(new GuiTrackSoloButton(this.guiSongData, this));
    this.draw(this.trackNumber);
  }
  getYTrackPosition() {
    return this.yTrackPosition;
  }
  setYTrackPosition (yTrackIndex) {
    this.yTrackPosition = (this.guiTracks.getTRACK_HEIGHT() * this.yTrackIndex) + this.SEQUENCER_CONTROL_BTNS_HEIGHT;
  }
  getTRACK_CONTROL_BTNS_WIDTH() {
    return this.TRACK_CONTROL_BTNS_WIDTH;
  }
  getREMOVE_BTN_WIDTH() {
    return this.REMOVE_BTN_WIDTH;
  }

  getGuiTrackButtons() {
    return this.trackButtons;
  }

  toggleColor (xDrawPosition, j) {
    const xTogglePosition = j + this.guiTracks.getTimelineXPosition();

    const zmLvl = (1 << this.guiTracks.getZoomLevel());
    let index;
    // if completely clicked gray then turn white else turn gray
    let emptyCount = 0;
    let i;
    for (i = 0; i < zmLvl; i++) {
      index = xTogglePosition * zmLvl + i;
      if (!this.colorToggle[index]) {
        emptyCount++;
        break;
      }
    }
    if (emptyCount !== 0) {
			// eslint-disable-next-line no-param-reassign
      this.guiSongData.getCanvasCtx().fillStyle = 'gray';
      for (i = 0; i < zmLvl; i++) {
        index = xTogglePosition * zmLvl + i;
        this.colorToggle[index] = 1;
        this.audioTrack.createPlayAudioMessage(index);
      }
    } else {
			// eslint-disable-next-line no-param-reassign
      this.guiSongData.getCanvasCtx().fillStyle = 'white';
      for (i = 0; i < zmLvl; i++) {
        index = xTogglePosition * zmLvl + i;
        delete this.colorToggle[index];
        this.audioTrack.removePlayAudioMessage(index);
      }
    }
    let tw = this.TICK_WIDTH;
    if (xDrawPosition + this.TICK_WIDTH > this.guiSongData.getCanvasWidth()) {
      tw = this.guiSongData.getCanvasWidth() - this.REMOVE_BTN_WIDTH - xDrawPosition;
    }
    this.guiSongData.getCanvasCtx().beginPath();
		// eslint-disable-next-line max-len
    this.guiSongData.getCanvasCtx().rect(this.TRACK_CONTROL_BTNS_WIDTH + xDrawPosition,	this.yTrackPosition, tw, this.guiTracks.getTRACK_HEIGHT());
    this.guiSongData.getCanvasCtx().fill();
  };

  removeSelf() {
    this.guiTracks.removeTrack(this.trackNumber);
  };

  mouseWasClicked(mouseX, mouseY) {

    if (mouseX > this.TRACK_CONTROL_BTNS_WIDTH &&
        mouseX < this.guiSongData.getCanvasWidth() - this.REMOVE_BTN_WIDTH &&
        mouseY > this.yTrackPosition &&
        mouseY < this.yTrackPosition + this.guiTracks.getTRACK_HEIGHT()) {
      const j = Math.floor((mouseX - this.TRACK_CONTROL_BTNS_WIDTH) / this.TICK_WIDTH);
      const xDrawPosition = j * this.TICK_WIDTH;
      this.toggleColor(xDrawPosition, j);
    }
  };

  drawGuiTrackButtons() {
    this.trackButtons.forEach((trackButton) => trackButton.draw());
  };

  drawGuiTrackWaveform() {
    const SMALLEST_TICK_WIDTH = this.TICK_WIDTH / (1 << this.guiTracks.getZoomLevel());
    let j = 0;
    // eslint-disable-next-line max-len
    for (; (j - 1) * SMALLEST_TICK_WIDTH < this.guiSongData.getCanvasWidth() - this.REMOVE_BTN_WIDTH; j++) {
      if (this.colorToggle[j + this.guiTracks.getTimelineXPosition() * (1 << this.guiTracks.getZoomLevel())]) {
				// eslint-disable-next-line no-param-reassign
        this.guiSongData.getCanvasCtx().fillStyle = 'gray';
      } else {
				// eslint-disable-next-line no-param-reassign
        this.guiSongData.getCanvasCtx().fillStyle = 'white';
      }
      this.guiSongData.getCanvasCtx().beginPath();
			// eslint-disable-next-line max-len
      this.guiSongData.getCanvasCtx().rect(this.TRACK_CONTROL_BTNS_WIDTH + j * SMALLEST_TICK_WIDTH, this.yTrackPosition, SMALLEST_TICK_WIDTH, this.guiTracks.getTRACK_HEIGHT());
      this.guiSongData.getCanvasCtx().fill();
    }

    const tw = this.guiSongData.getCanvasWidth() - this.REMOVE_BTN_WIDTH - (j * SMALLEST_TICK_WIDTH);
    if (tw > 0) {
      if (this.colorToggle[(j + this.guiTracks.getTimelineXPosition()) * (1 << this.guiTracks.getZoomLevel())]) {
				// eslint-disable-next-line no-param-reassign
        this.guiSongData.getCanvasCtx().fillStyle = 'gray';
      } else {
				// eslint-disable-next-line no-param-reassign
        this.guiSongData.getCanvasCtx().fillStyle = 'white';
      }
      this.guiSongData.getCanvasCtx().beginPath();
			// eslint-disable-next-line max-len
      this.guiSongData.getCanvasCtx().rect(this.TRACK_CONTROL_BTNS_WIDTH + j * SMALLEST_TICK_WIDTH, this.yTrackPosition,	tw,	this.guiTracks.getTRACK_HEIGHT());
      this.guiSongData.getCanvasCtx().fill();
    }
  };

  draw(yTrackIndex) {
    this.setYTrackPosition(yTrackIndex);
    this.drawGuiTrackWaveform();
    this.drawGuiTrackButtons();
  };
};
