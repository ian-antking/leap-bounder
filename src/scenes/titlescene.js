import 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
  }

  create() {
    const canvas = document.querySelector('canvas');
    this.logo = this.add.image((canvas.width / 2), (canvas.height / 2) - 50, 'logo');
    this.logo.setScale(0.75);
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const titleText = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: 'Press Spacebar',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    titleText.setOrigin(0.5, 0.5);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('Game');
    });
  }
}
