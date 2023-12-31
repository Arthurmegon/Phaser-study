import Phaser, { LEFT } from 'phaser';
import phaser from '../utils/phaser';

export default class Preload extends Phaser.Scene {
  public x: number = 0;
  public y: number = 0;

  constructor() { 
    super('Preload'); 
  }

  preload() {
    console.log(`✅ ${this.scene.key}`);

    this.x = phaser.get(this).center().x
    this.y = phaser.get(this).center().y

    //IMAGES
    this.load.image('sky', 'images/sky.png');
    this.load.image('ground', 'images/platform.png');
    this.load.image('star', 'images/star.png');
    this.load.image('bomb', 'images/bomb.png');
    this.load.image('button', 'images/button.png',);

    //SPRITES
    this.load.spritesheet('dude', 
        'images/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    this.add.text(this.game.config.width as number / 2.1, this.game.config.height as number / 2, 'Preload Scene ✅');
    this.scene.start('GameScene', {fadeIn: true});
    //this.scene.start('GameOver', {fadeIn: true});
  }
}