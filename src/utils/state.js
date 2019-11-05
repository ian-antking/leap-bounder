class State {
  constructor(name, sprite) {
    this.name = name;
    this.sprite = sprite;
    this.timers = {};
    this.listeners = {};
  }

  enter() {
  }

  execute() {
    return this.name;
  }

  exit() {
  }

  handleInput() {
    return this.maintainState();
  }

  setState(state) {
    this.sprite.state.setState(state);
  }
}

export default State;
