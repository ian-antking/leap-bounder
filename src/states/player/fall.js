import State from '../../utils/state';

class FallState extends State {
  constructor(name, sprite) {
    super(name, sprite);
  }

  execute() {
    console.log('falling');
    return Math.abs(this.sprite.velocityY) === 0 ? 'stand' : this.name;
  }
}

export default FallState;
