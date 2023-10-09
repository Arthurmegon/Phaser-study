import Phaser, { LEFT } from 'phaser';
import phaser from '../utils/phaser';

export default class Preload extends Phaser.Scene {
  constructor() { 
    super('Preload'); 
  }

  preload() {
    console.log(`✅ ${this.scene.key}`);

    this.x = phaser.get(this).center().x
    this.y = phaser.get(this).center().y
    this.load.spritesheet('quadrado', `./images/keyboard-sprite.png`, { frameWidth: 120, frameHeight: 120 });
  }

  create() {
    this.add.text(this.game.config.width as number / 2.1, this.game.config.height as number / 2, 'Preload Scene ✅');
    this.scene.start('PlayGame', {fadeIn: true});
  }
}