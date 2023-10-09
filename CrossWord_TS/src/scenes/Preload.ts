import Phaser, { LEFT } from 'phaser';
import phaser from '../utils/phaser';

export default class Preload extends Phaser.Scene {
  public x: number = 0;
  public y: number = 0;

  constructor() {
    super('Preload');
  }

  preload() {
    this.x = phaser.get(this).center().x
    this.y = phaser.get(this).center().y

    //IMAGES
    this.load.image('start-bg', 'images/background/start-bg.png');

    //SPRITES
    this.load.spritesheet('letters', 
        'images/letters-sprite.png',
        { frameWidth: 100, frameHeight: 100 }
    );
  }

  create() {
    this.add.text(this.game.config.width as number / 2.1, this.game.config.height as number / 2, 'Preload Scene ✅');
    this.scene.start('CrossWord', {fadeIn: true});
  }
}
