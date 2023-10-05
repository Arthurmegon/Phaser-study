// plugins 
// import 'phaser3-rex-plugins/.....'
import 'phaser/plugins/spine/dist/SpinePlugin'
import Phaser from 'phaser';

// scenes
import Preload from './scenes/Preload';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';

new Phaser.Game({
  //SCENES
  scene: [Preload, Game, GameOver],

  //PLUGINS
  plugins: {
    scene: [
			{ key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
		]
  },
  type: Phaser.AUTO,
  parent: 'db739594-062e-4b43-b0b5-3d3e3d17846e',
  backgroundColor: '#222',
  scale: {
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
});
