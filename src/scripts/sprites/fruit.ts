import { ANIMATION_FRAME_RATE } from "../common/consts";

export class Fruit extends Phaser.Physics.Arcade.Sprite {
  private uiScene: Phaser.Scene;
  private collected: Boolean = false;
  private sounds: Array<any> = [];
  constructor(scene, x, y, type = 'apple') {
    super(scene, x, y, `fruit_${type}`)
    this.scene = scene;
    this.uiScene = this.scene.scene.get('UIScene')
    // add our player to the scene
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.body.setSize(22, 23)
    this.body.setOffset(4, 3);
    this.setScale(1.5)

    scene.anims.create({
      key: `fruit_${type}Idle`,
      frames: scene.anims.generateFrameNumbers(`fruit_${type}`, { start: 0, end: 16 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: -1
    });

    scene.anims.create({
      key: 'fruitCollected',
      frames: scene.anims.generateFrameNumbers('fruit_collected', { start: 0, end: 5 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: 0
    });

    this.anims.play(`fruit_${type}Idle`, true)
    this.sounds['collect'] = this.scene.sound.add('collect');
  }

  onOverlap = () => {
    if (!this.collected) {
      this.sounds['collect'].play()
      this.collected = true;
      return new Promise(resolve => {
        this.anims.play('fruitCollected', true)
        this.scene.time.delayedCall(150, this.destroy, [], this)
        this.uiScene.events.emit('collect');
      })
    }
  }
}
