import State from '../../utils/state';

class FallState extends State {
  constructor(name, sprite) {
    super(name, sprite);
  }

  execute() {
    return this.sprite.onGround ? 'stand' : this.name;
  }
}

export default FallState;
