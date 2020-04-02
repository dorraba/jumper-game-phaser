
export class FinishScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey: any;
  constructor() {
    super({
      key: "FinishScene", active: false
    });
  }

  preload() {
    this.load.audio('finishGame', ['../assets/sounds/finishGame.wav']);
  }

  create(): void {
    const finishSound = this.sound.add('finishGame');
    finishSound.play();
    document.getElementById('game').style.width = window.innerWidth + 'px';
    this.game.scale.setGameSize(window.innerWidth, window.innerHeight)
    this.scene.stop('MainScene');
    this.scene.setVisible(false, 'UIScene');

    const gameOverText = this.add.text(window.innerWidth/2, window.innerHeight/2 - 100, "You made it", { fontSize: '100px', fill: '#fff', boundsAlignV: "middle", boundsAlignX: "middle" })
    const gameOverTextAction = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 100, "Congratulations!!!", { fontSize: '50px', fill: '#fff', boundsAlignV: "middle", boundsAlignX: "middle" })
    gameOverText.setOrigin();
    gameOverTextAction.setOrigin();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.scene.start('MainScene');
      this.scene.stop('FinishScene');
      this.scene.get('UIScene').scene.restart();
      this.scene.setVisible(true, 'UIScene');
    }
  }
}
