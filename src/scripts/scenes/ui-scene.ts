import { FIRST_LEVEL_ID } from '../common/levels';
import gameData from '../common/gameData';
import { LEVELS } from "../common/levels";

export class UIScene extends Phaser.Scene {
  private scoreText: Phaser.GameObjects.Text
  private levelText: Phaser.GameObjects.Text;
  private livesText: Phaser.GameObjects.Text;
  private level: any = LEVELS[FIRST_LEVEL_ID];
  constructor() {
    super({
      key: "UIScene", active: true
    });
  }

  getCollectedText = () => `Collected: ${gameData.collected}/${gameData.total}`
  getLivesText = () => `Lives: ${gameData.lives}`
  refreshText = (data?) => {
    this.scoreText.setText(this.getCollectedText())
    data && this.levelText.setText(data.level.name)
    this.livesText.setText(this.getLivesText())
  };
  create(): void {
    this.level = LEVELS[FIRST_LEVEL_ID];
    this.levelText = this.add.text(20, 20, this.level.name, { fontSize: '32px', fill: '#fff' })
    this.scoreText = this.add.text(230, 20, this.getCollectedText(), { fontSize: '32px', fill: '#fff' })
    this.livesText = this.add.text(630, 20, this.getLivesText(), { fontSize: '32px', fill: '#fff' })
    this.levelText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.livesText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    this.events.on('setTotalToCollect', this.setTotalToCollect);

    this.events.on('collect',this.collect);

    this.events.on('resetScore', this.resetScore);
  }

  collect =  () => {
    gameData.collected++;
    this.refreshText();
    if (gameData.collected === gameData.total) {
      this.events.emit('collectedAll');
    }
  }

  resetScore = (data) => {
    if (data.gameOver) {
      // this.events.removeAllListeners('setTotalToCollect');
      this.events.removeAllListeners('collect');
      this.events.removeAllListeners('resetScore');
    }
    gameData.collected = 0;
    gameData.total = 0;
    this.level = data.level || this.level
    if (gameData.lives >= 0) {
      this.refreshText(data);
    }
  }

  setTotalToCollect = (value) => {
    gameData.total = value;
    this.refreshText();
  }
}
