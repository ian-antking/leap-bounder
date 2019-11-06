import State from '../../utils/state';

class StandState extends State {
  constructor(name, sprite) {
    super(name, sprite);
  }

  enter() {
    this.sprite.move('stop');
  }

  execute(command) {
    const { name } = command;
    return name === 'leftDown' || name === 'rightDown' ? 'walk' : this.name;
  }
}

export default StandState;
