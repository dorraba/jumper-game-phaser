import { FIRST_LEVEL_ID } from '../common/levels';
import gameData from '../common/gameData';
import { LEVELS } from "../common/levels";

class ArrowButton extends Phaser.GameObjects.Image {
  constructor(scene, x, y, public arrowType: string) {
    super(scene, x, y, 'arrowButton');
    this.scene.add.existing(this)
    this.setScale(0.5);
    this.setAlpha(0.5);
    this.setInteractive();
  }
}

export class ControllersScene extends Phaser.Scene {
  constructor() {
    super({
      key: "ControllersScene", active: true
    });
  }
  preload() {
    this.load.image('arrowButton', '../../assets/raw/arrow.png');
  }

  create(): void {
    this.input.addPointer(5);
    const buttonTop = window.innerHeight - 70;

    const arrowUp = new ArrowButton(this, window.innerWidth - 100, buttonTop, 'up');
    const arrowLeft = new ArrowButton(this, 80, buttonTop, 'left').setRotation(-1.57);
    const arrowRight = new ArrowButton(this, 180, buttonTop, 'right').setRotation(1.57);
    this.input.on('gameobjectdown', (pointer, gameObject: ArrowButton) => {
      this.events.emit('gameobjectdown', gameObject.arrowType)
    })
    this.input.on('gameobjectup', (pointer, gameObject: ArrowButton) => {
      console.log('controllers ', gameObject.arrowType)
      this.events.emit('gameobjectup', gameObject.arrowType)
    })
  }
}
