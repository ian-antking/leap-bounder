import 'phaser';
import config from './config/config';
import BootScene from './scenes/bootscene';
import CreditsScene from './scenes/creditscene';
import GameScene from './scenes/gamescene';
import OptionsScene from './scenes/optionscene';
import PreloaderScene from './scenes/preloaderscene';
import TitleScene from './scenes/titlescene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
