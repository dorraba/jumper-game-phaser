
export class StartScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey: any;
  constructor() {
    super({
      key: "StartScene", active: true
    });
  }

  create(): void {
    document.getElementById('game').style.width = window.innerWidth + 'px';
    this.scene.stop('MainScene');
    this.scene.stop('FinishScene');
    this.scene.stop('GameOverScene');
    this.scene.setVisible(false, 'UIScene');
    const gameOverText = this.add.text(window.innerWidth/2, window.innerHeight/2 - 100, "JUMPY", { fontSize: '100px', fill: '#fff', boundsAlignV: "middle", boundsAlignX: "middle" })
    const gameOverTextAction = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 100, "Press SPACE to start", { fontSize: '50px', fill: '#fff', boundsAlignV: "middle", boundsAlignX: "middle" })
    gameOverText.setOrigin();
    gameOverTextAction.setOrigin();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.scene.start('MainScene');
      this.scene.stop('StartScene');
      this.scene.setVisible(true, 'UIScene');
    }
  }
}
