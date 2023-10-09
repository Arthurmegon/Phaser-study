import Phaser, { LEFT } from 'phaser';
import phaser from '../utils/phaser';

export default class PlayGame extends Phaser.Scene{
  private xOry = 0;
  private jogada = 0;
  private tabuleiro!: string[][];
  public resultado = 0;

  constructor() {
    super({ key: 'PlayGame' });
  }

  create() {
    this.add.text(this.game.config.width as number / 2.9, this.game.config.height as number / 5, 'JOGO DA VELHA',  {fontSize: '80px', color: '#ffff', fontFamily: 'monospace'});

    this.tabuleiro = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         const quadrado = this.add.sprite(820 + j * 120, 450 + i * 120, 'quadrado').setInteractive();
        quadrado.setData('row', i);
        quadrado.setData('col', j);
        quadrado.on('pointerdown', this.marcar, this);
      }
    }

    this.add.text(100, 250, '', { fontSize: '32px', color: '#fff' }).setOrigin(0.5, 0);
  }

  marcar(pointer: Phaser.Input.Pointer) {
    const jogadaText = this.add.text(100, 250, '', { fontSize: '32px', color: '#fff' });
    const row = Math.floor((pointer.y - 450) / 120);
    const col = Math.floor((pointer.x - 820) / 120);

    if (this.tabuleiro[row][col] !== 'X' && this.tabuleiro[row][col] !== 'O') {
      this.jogada++;

      if (this.xOry === 0) {
        this.add.text(820 + col * 120, 450 + row * 120, 'X', { fontSize: '48px', color: '#f00' });
        this.xOry = 1;
        this.tabuleiro[row][col] = 'X';
      } else {
        this.add.text(820 + col * 120, 450 + row * 120, 'O', { fontSize: '48px', color: '#00f' });
        this.xOry = 0;
        this.tabuleiro[row][col] = 'O';
      }
    }

    this.comparar();
    if (this.resultado > 0) {
      if (this.resultado === 1) {
        jogadaText.setText('Parabéns X, você ganhou');
      } else {
        jogadaText.setText('Parabéns O, você ganhou');
      }
    } else if (this.jogada === 9) {
      jogadaText.setText('Velha');
    }
    if (this.resultado > 0 || this.jogada === 9) {
      this.scene.launch('Restart');
      this.jogada = 0;
      this.resultado = 0;
    }
  }

  comparar() {
    for (let i = 0; i < 3; i++) {
      if (this.tabuleiro[i][0] === this.tabuleiro[i][1] && this.tabuleiro[i][1] === this.tabuleiro[i][2]) {
        if (this.tabuleiro[i][0] === 'X') {
          this.resultado = 1;
        } else if (this.tabuleiro[i][0] === 'O') {
          this.resultado = 2;
        }
      }

      if (this.tabuleiro[0][i] === this.tabuleiro[1][i] && this.tabuleiro[1][i] === this.tabuleiro[2][i]) {
        if (this.tabuleiro[0][i] === 'X') {
          this.resultado = 1;
        } else if (this.tabuleiro[i][0] === 'O') {
          this.resultado = 2;
        }
      }

      if ((this.tabuleiro[0][0] === this.tabuleiro[1][1] && this.tabuleiro[1][1] === this.tabuleiro[2][2]) ||
        (this.tabuleiro[0][2] === this.tabuleiro[1][1] && this.tabuleiro[1][1] === this.tabuleiro[2][0])) {
        if (this.tabuleiro[1][1] === 'X') {
          this.resultado = 1;
        } else if (this.tabuleiro[1][1] === 'O') {
          this.resultado = 2;
        }
      }
    }
  }
}