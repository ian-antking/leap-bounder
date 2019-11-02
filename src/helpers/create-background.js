import 'phaser';

const createBackground = (scene, layers) => {
  const background = scene.add.image(0, 0, layers.background).setOrigin(0, 0);
  const scaleX = scene.cameras.main.width / background.width;
  const scaleY = scene.cameras.main.height / background.height;
  const scale = Math.max(scaleX, scaleY);
  background.setScale(scale).setScrollFactor(0);
  return background;
};

export default createBackground;
