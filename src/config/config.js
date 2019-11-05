import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 640,
  height: 360,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1000,
      },
      debug: true,
    },
  },
};
