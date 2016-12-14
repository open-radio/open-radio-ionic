export { playSongService };

function playSongService(audioSongData, audioTracks) {
  const startTime = audioSongData.getAudioCtx().currentTime;
  audioTracks.getAudioTracks().forEach((audioTrack) => {
    audioTrack.getPlayAudioMessages().forEach((audioMessage) => {
      const audioNode = audioSongData.getAudioCtx().createBufferSource();
      audioNode.buffer = audioTrack.getAudioBuffer();
      audioNode.loop = true;
      audioNode.connect(audioSongData.getAudioCtx().destination);
      // eslint-disable-next-line max-len
      audioNode.start(audioMessage.getWhen() + startTime + 0.1, audioMessage.getOffset(), audioMessage.getDuration());
      console.log(audioMessage.getWhen(), audioMessage.getOffset(), audioMessage.getDuration());
      audioTrack.createStopAudioNode(audioNode);
    });
  });
};
