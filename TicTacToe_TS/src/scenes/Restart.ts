import Phaser, { LEFT } from 'phaser';
import phaser from '../utils/phaser';

export default class Restart extends Phaser.Scene{
  constructor() { 
      super({ key: 'Restart' }); 
  }
  
  create(){
    // RESTART BUTTON
    const button = this.add.image(960, 940, 'button')
        button.setScale(4, 8)
        .setInteractive()
        .on('pointerdown', () => this.onButtonClicked());
    this.add.text(905, 925, 'RESTART', {fontSize: '30px', color: '#00000', fontFamily: 'monospace'});
    this.input.on('pointerover', () => button.setAlpha(0.7));
    this.input.on('pointerout', () => button.setAlpha(1));
  }
  
  onButtonClicked() {
    this.scene.start('PlayGame', {fadeIn: true});
  }
}