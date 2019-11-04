import 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const instructionText = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: 'Press Spacebar',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });

    const titleText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: 'Leap-Bounder',
      style: {
        font: '32px monospace',
        fill: '#ffffff',
      },
    });

    instructionText.setOrigin(0.5, 0.5);
    titleText.setOrigin(0.5, 0.5);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Game');
    });
  }
}
