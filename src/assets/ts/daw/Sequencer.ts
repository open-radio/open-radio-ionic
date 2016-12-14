import $ from 'jquery';
import { AudioSongData } from './AudioSongData.ts';
import { GuiSongData } from './GuiSongData.ts';
import { AudioTracks } from './AudioTracks.ts';
import { GuiTracks } from './GuiTracks.ts';
import { GuiSequencerMoveControl } from './GuiSequencerMoveControl.ts';
import { GuiSequencerPlayButton } from './GuiSequencerPlayButton.ts';
import { GuiSequencerStopButton } from './GuiSequencerStopButton.ts';
import { GuiSequencerZoomInButton } from './GuiSequencerZoomInButton.ts';
import { GuiSequencerZoomOutButton } from './GuiSequencerZoomOutButton.ts';
import { GuiSequencerSearchBox } from './GuiSequencerSearchBox.ts';

export { Sequencer };


class Sequencer {
  private audioSongData = new AudioSongData();
  private guiSongData = new GuiSongData();
  private guiTracks = new GuiTracks(this.guiSongData);
  private audioTracks = new AudioTracks(this.guiSongData, this.audioSongData, this.guiTracks);
  //guiSearchBox(guiSongData, audioSongData, guiTracks, audioTracks);

  private guiSequencerZoomInButton = new GuiSequencerZoomInButton(this.guiSongData, this.guiTracks);
  private guiSequencerZoomOutButton = new GuiSequencerZoomOutButton(this.guiSongData, this.guiTracks);
  private guiSequencerMoveControl = new GuiSequencerMoveControl(this.guiSongData, this.guiTracks);

  private guiSequencerPlayButton = new GuiSequencerPlayButton(this.guiSongData, this.audioSongData, this.audioTracks);
  private guiSequencerStopButton = new GuiSequencerStopButton(this.guiSongData, this.audioTracks);

  private canvasClicked = false;

  constructor() {
  }
  draw() {
    this.guiTracks.draw();

    this.guiSequencerZoomInButton.draw();
    this.guiSequencerZoomOutButton.draw();
    this.guiSequencerMoveControl.draw();

    this.guiSequencerPlayButton.draw();
    this.guiSequencerStopButton.draw();
  }
  load() {

    $(window).resize(() => {
      (<HTMLCanvasElement>document.getElementById('sequencerCanvas')).width = window.innerWidth - 4;
      (<HTMLCanvasElement>document.getElementById('sequencerCanvas')).height = window.innerHeight - 103;
      this.draw();
    });

    (<HTMLCanvasElement>document.getElementById('sequencerCanvas')).onmousedown = (event) => {
      event.preventDefault();
      if (this.canvasClicked === false) {
        this.canvasClicked = true;
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        this.guiTracks.getGuiTracks().forEach((guiTrack) => {
          guiTrack.mouseWasClicked(mouseX, mouseY);
          guiTrack.getGuiTrackButtons().forEach((guiTrackButton) =>
            guiTrackButton.mouseWasClicked(mouseX, mouseY));
        });

        this.guiSequencerMoveControl.mouseWasClicked(mouseX, mouseY);
        this.guiSequencerPlayButton.mouseWasClicked(mouseX, mouseY);
        this.guiSequencerStopButton.mouseWasClicked(mouseX, mouseY);
        this.guiSequencerZoomInButton.mouseWasClicked(mouseX, mouseY);
        this.guiSequencerZoomOutButton.mouseWasClicked(mouseX, mouseY);
      }
    };
    (<HTMLCanvasElement>document.getElementById('sequencerCanvas')).onmouseup = (event) => {
      event.preventDefault();
      this.canvasClicked = false;
    };
    $(window).resize();
  }
}
