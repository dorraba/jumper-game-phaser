import { IS_MOBILE } from "../common/consts";

export class GameOverScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey: any;
  constructor() {
    super({
      key: "GameOverScene", active: true
    });
  }

  create(): void {
    document.getElementById('game').style.width = window.innerWidth + 'px';
    this.game.scale.setGameSize(window.innerWidth, window.innerHeight)
    this.scene.stop('MainScene');
    IS_MOBILE && this.scene.stop('ControllersScene');
    this.scene.setVisible(false, 'UIScene');

    const gameOverText = this.add.text(window.innerWidth/2, window.innerHeight/2 - 100, "GAME OVER", { fontSize: '100px', fill: '#fff', boundsAlignV: "middle", boundsAlignX: "middle" }).setInteractive()
    const gameOverTextAction = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 100, "Press SPACE to start again", { fontSize: '50px', fill: '#fff', boundsAlignV: "middle", boundsAlignX: "middle" }).setInteractive()
    gameOverText.setOrigin();
    gameOverTextAction.setOrigin();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.input.on('gameobjectdown', () => {
      this.start()
    })
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.start()
    }
  }

  start() {
    this.scene.start('MainScene');
      this.scene.stop('GameOverScene');
      this.scene.get('UIScene').scene.restart();
      IS_MOBILE && this.scene.start('ControllersScene');
      this.scene.setVisible(true, 'UIScene');
  }
}
