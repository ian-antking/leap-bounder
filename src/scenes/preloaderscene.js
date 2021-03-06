import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount >= 2) {
      this.scene.start('Title');
    }
  }

  preload() {
    const canvas = document.querySelector('canvas');
    const progressBarX = (canvas.width / 2) - 160;
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(progressBarX, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 100,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(progressBarX + 10, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(1000, this.ready, [], this);
    this.load.atlasXML('player', 'assets/spritesheet_players.png', 'assets/spritesheet_players.xml');
    this.load.atlasXML('enemies', 'assets/spritesheet_enemies.png', 'assets/spritesheet_enemies.xml');
    this.load.atlasXML('items', 'assets/spritesheet_items.png', 'assets/spritesheet_items.xml');
    this.load.atlasXML('other', 'assets/spritesheet_other.png', 'assets/spritesheet_other.xml');
    this.load.spritesheet('tilesheet_complete', 'assets/tilesheet_complete.png', { frameWidth: 64, frameHeight: 64 });
    this.load.tilemapTiledJSON('level0', 'assets/level0.json');
    this.load.tilemapTiledJSON('level1', 'assets/level1.json');
    this.load.tilemapTiledJSON('level2', 'assets/level2.json');
    this.load.tilemapTiledJSON('level3', 'assets/level3.json');
    this.load.tilemapTiledJSON('level4', 'assets/level4.json');
    this.load.tilemapTiledJSON('level5', 'assets/level5.json');
    this.load.tilemapTiledJSON('level6', 'assets/level6.json');
    this.load.tilemapTiledJSON('level7', 'assets/level7.json');
  }

  create() {
  }
}
