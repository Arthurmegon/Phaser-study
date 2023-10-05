import Phaser, { LEFT } from 'phaser';
import phaser from '../utils/phaser';

export default class Preload extends Phaser.Scene {
  public x: number = 0;
  public y: number = 0;
  public player!: Phaser.Physics.Arcade.Sprite;
  public stars!: Phaser.Physics.Arcade.Group;
  public bombs!: Phaser.Physics.Arcade.Group;
  public platforms!: Phaser.Physics.Arcade.StaticGroup;
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  public score = 0;
  public gameOver = false;
  public scoreText!: Phaser.GameObjects.Text;

  constructor() { 
    super('Preload'); 
  }

  preload() {
    console.log(`✅ ${this.scene.key}`);

    this.x = phaser.get(this).center().x
    this.y = phaser.get(this).center().y

    //IMAGES
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('button', 'assets/button.png');

    //SPRITES
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    this.add.text(this.game.config.width as number / 2.1, this.game.config.height as number / 2, 'Preload Scene ✅');
    this.scene.start('GameScene', {fadeIn: true});
    //this.scene.start('GameOver', {fadeIn: true});
  }
}