import Phaser, { LEFT } from 'phaser';
import phaser from '../utils/phaser';

export default class GameOver extends Phaser.Scene{

    constructor() { 
        super({ key: 'GameOver' }); 
    }

    create(){
        // GAME OVER TEXT
        this.add.text(this.game.config.width as number / 2.7, this.game.config.height as number / 4, 'GAME OVER',  {fontSize: '40px', color: '#ff0000', fontFamily: 'monospace'});

        // RESTART BUTTON
        const button = this.add.image(400, 300, 'button')
            .setInteractive()
            .on('pointerdown', () => this.onButtonClicked());
        this.input.on('pointerover', () => button.setAlpha(0.7));
        this.input.on('pointerout', () => button.setAlpha(1));
    }

    onButtonClicked() {
        this.scene.start('GameScene', {fadeIn: true});
    }
}