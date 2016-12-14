export { stopSongService };

function stopSongService(audioTracks) {
  audioTracks.getAudioTracks().forEach((audioTrack) => {
    audioTrack.getStopAudioNodes().forEach((audioNode) => audioNode.stop());
    audioTrack.clearStopAudioNodes();
  });
};
