import State from '../../utils/state';

class WalkState extends State {
  constructor(name, sprite) {
    super(name, sprite);
  }

  enter(command) {
    const direction = command.name.includes('left') ? 'left' : 'right';
    this.sprite.move(direction);
  }

  execute(command) {
    const { name } = command;
    return name === 'leftUp' || name === 'rightUp' ? 'stand' : this.name;
  }
}

export default WalkState;
