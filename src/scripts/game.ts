import "phaser";
import { GAME_WIDTH, GAME_HEIGHT, GRAVITY_Y, TILE_BIAS, FPS } from "./common/consts";
import { UIScene } from "./scenes/ui-scene.ts";
import { GameOverScene } from "./scenes/game-over-scene";
import { FinishScene } from "./scenes/finish-scene";
import { StartScene } from "./scenes/start-scene";
import { MainScene } from "./scenes/main-scene";

// main game configuration
const config: any = {
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  type: Phaser.AUTO,
  parent: "game",
  pixelArt: true,
  roundPixels: true,
  backgroundColor: '#211F30',
  // mode: Phaser.Scale.FIT,
  // autoCenter: Phaser.Scale.CENTER_BOTH,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GRAVITY_Y },
      tileBias: TILE_BIAS,
      fps:FPS,
      // debug: true
    }
  },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    //Start game scene - select player
    //Level map select
    this.scene.add('MainScene', MainScene);
    this.scene.add('UIScene', UIScene);
    this.scene.add('GameOverScene', GameOverScene);
    this.scene.add('FinishScene', FinishScene);
    this.scene.add('StartScene', StartScene);
    this.scene.start('StartScene');
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  const game = new Game(config);
});
