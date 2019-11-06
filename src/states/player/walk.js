import State from '../../utils/state';

class WalkState extends State {
  constructor(name, sprite) {
    super(name, sprite);
  }

  enter(command) {
    this.direction = command.name.includes('left') ? 'left' : 'right';
    this.sprite.move(this.direction);
  }

  execute(command) {
    const { name } = command;

    if (Math.abs(this.sprite.velocityY) > 0) {
      return 'fall';
    }

    if (name.includes('Down')) {
      this.direction = name.includes('left') ? 'left' : 'right';
    }

    this.sprite.move(this.direction);

    return name === `${this.direction}Up` ? 'stand' : this.name;
  }
}

export default WalkState;
