export { AudioMessage };

class AudioMessage {
  private when;
  private offset;
  private duration;

  constructor(when, offset, duration) {
    this.when = when;
    this.offset = offset;
    this.duration = duration;
  }
  getWhen () {
    return this.when;
  }
  getOffset() {
    return this.offset;
  }
  getDuration() {
    return this.duration;
  }
};
