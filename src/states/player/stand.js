import State from '../../utils/state';

class StandState extends State {
  constructor(name, sprite) {
    super(name, sprite);
  }

  enter() {
    this.sprite.move('stop');
  }

  execute(command) {
    // if (this.sprite.velocityY !== 0) {
    //   return 'fall';
    // }
    return command.name === 'leftDown' || command.name === 'rightDown' ? 'walk' : this.name;
  }
}

export default StandState;
