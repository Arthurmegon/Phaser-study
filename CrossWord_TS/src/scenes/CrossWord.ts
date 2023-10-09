import Phaser from 'phaser';

export default class CrossWord extends Phaser.Scene {
  public grid: string[][] = [
    ['_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
  ];

  public cellSize = 50;
  public startX = 100;
  public startY = 100;
  public selectedCell: { row: number, col: number } | null = null;

  constructor() {
    super({ key: 'CrossWord' });
  }

  preload() {  }

  create() {
    // BACKGROUND
    this.add.image(960, 540, 'start-bg');
    this.add.text(this.game.config.width as number / 2.7, this.game.config.height as number / 2, 'CrossWord Scene ✅', {color: '#000000', fontSize: '40px'} );
  
    this.drawGrid();

    // Adicione um evento de clique para as células
    this.input.on('gameobjectdown', this.onCellClick, this);

    // Adicione um evento de tecla para inserir letras
    this.input.keyboard.on('keydown', this.onKeyDown, this);
  }

  public drawGridAcross() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const cell = this.add.rectangle(
          this.startX + j * this.cellSize,
          this.startY + i * this.cellSize,
          this.cellSize,
          this.cellSize,
          0x000000
        );

        const letter = this.add.text(
          this.startX + j * this.cellSize - 10,
          this.startY + i * this.cellSize - 10,
          this.grid[i][j],
          {
            fontSize: '24px',
            color: '#ff0000'
          }
        );

        letter.setOrigin(0.5);
      }
    }
  }

  public onCellClick(pointer: Phaser.Input.Pointer, cell: Phaser.GameObjects.Rectangle) {
    const col = Math.floor((pointer.x - this.startX) / this.cellSize);
    const row = Math.floor((pointer.y - this.startY) / this.cellSize);

    this.selectedCell = { row, col };
    console.log(`Célula selecionada: (${row}, ${col})`);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (this.selectedCell !== null) {
      const key = event.key.toUpperCase();

      if (key.match(/[A-Z]/)) {
        this.grid[this.selectedCell.row][this.selectedCell.col] = key;
        this.updateGridText();
      }
    }
  }

  public updateGridText() {
    this.children.iterate((child: any) => {
      if (child instanceof Phaser.GameObjects.Text) {
        const row = Math.floor((child.y - this.startY) / this.cellSize);
        const col = Math.floor((child.x - this.startX) / this.cellSize);

        child.setText(this.grid[row][col]);
      }
    });
  }
}
    // const words = ['teste', 'jogando', 'cruzadinha'];

    // // GRID
    // const gridSize = 100;
    // const grid = this.add.group();
    // for (let i = 0; i < words.length; i++) {
    //   for (let j = 0; j < words[i].length; j++) {
    //     const tile = this.add
    //       .image(j * gridSize, i * gridSize, 'letters')
    //       .setOrigin(-5)
    //       .setInteractive()
    //       .on('pointerdown', () => this.onTileClicked(i, j));
    //     grid.add(tile);
    //   }
    // }

    // this.add.text(0, gridSize * words.length, words.join('   '), {
    //   font: '24px Arial',
    //   color: '#00000',
    // });

    // // Inicializar o estado do jogo
    // this.wordLocations = words.map(() => []);
