class State {
  constructor(name, prefab) {
    this.name = name;
    this.prefab = prefab;
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
    this.prefab.state.setState(state);
  }
}

export default State;
