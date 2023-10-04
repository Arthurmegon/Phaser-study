import Phaser from 'phaser';

export default class Example extends Phaser.Scene {
  
  public platforms!: Phaser.Physics.Arcade.StaticGroup;

  constructor() { 
    super({ key: 'ExampleScene' }); 
  }

  preload() { }

  create() {
    console.log(`✅ ${this.scene.key}`);
    this.add.text(this.game.config.width as number / 2.1, this.game.config.height as number / 2, 'Example Scene ✅');
    
  }
}
