import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  public x: number = 0;
  public y: number = 0;
  public player!: Phaser.Physics.Arcade.Sprite;
  public stars!: Phaser.Physics.Arcade.Group;
  public bombs!: Phaser.Physics.Arcade.Group;
  public platforms!: Phaser.Physics.Arcade.StaticGroup;
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  public score = 0;
  public scoreText!: Phaser.GameObjects.Text;
  
  constructor() { 
    super({ key: 'GameScene' }); 
  }

  preload() { console.log(`✅ ${this.scene.key}`);}

  create() {
    // BACKGROUND
    this.add.image(400, 300, 'sky');

    // PLATFORMS GROUP
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    // PLAYER GROUP
    this.player = this.physics.add.sprite(100, 450, 'dude') as Phaser.Physics.Arcade.Sprite;
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // PLAYER ANIMS
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    // INPUT CHECK
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    // STARS GROUP
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 4,
      setXY: {x: 100, y: 0, stepX: 150}
    });

    // STARS BOUNCE
    this.stars.children.iterate((child) => {
      const childImage = child as Phaser.Physics.Arcade.Image;
      childImage.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      return true;
    });

    // BOMBS GROUP
    this.bombs = this.physics.add.group();

    // SCORE TEXT
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '40px', color: '#1f045e', fontFamily: 'monospace', });

    // PLATFORMS COLLIDERS
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //
    this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, undefined, this);
  }

  update() {
    // INPUTS MOVIMENTAÇÃO ESQUERDA E DIREITA
    if (this.cursors?.left?.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors?.right?.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    // INPUTS PULO E DESCIDA
    if (this.cursors?.up?.isDown && this.player.body?.touching.down) {
      this.player.setVelocityY(-330);
    }
    else if (this.cursors?.down?.isDown && !this.player.body?.touching.down) {
      this.player.setVelocityY(330);
    }
  }

  // COLLIDER > PLAYER - STAR
  collectStar(player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Image) {
    star.disableBody(true, true);

    // SCORE ++
    this.score ++;
    this.scoreText.setText('Score: ' + this.score);

    // RESPAWN STAR
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        const childImage = child as Phaser.Physics.Arcade.Image;
        childImage.enableBody(true, childImage.x, 0, true, true);
        return true;
      });

      const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      // SPAWN BOMB 
      const bomb = this.bombs.create(x, 16, 'bomb') as Phaser.Physics.Arcade.Image;
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.setGravity(0, 0);
    }
  }

  // COLLIDER HIT PLAYER > PLAYER - BOMB
  hitBomb(player: Phaser.Physics.Arcade.Sprite, bomb: Phaser.Physics.Arcade.Image) {
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.scene.launch('GameOver', {fadeOut: true});
    this.score = 0;
  }
}
