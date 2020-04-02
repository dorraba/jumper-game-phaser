import { ANIMATION_FRAME_RATE, JUMP_VELOCITY, RUN_VELOCITY } from "../common/consts";

export class Checkpoint extends Phaser.Physics.Arcade.Sprite {
  private uiScene: Phaser.Scene;
  private enableCheckpoint: Boolean = false;
  constructor(scene, x, y) {
    super(scene, x, y, 'checkPointIdle')

    this.scene = scene;
    this.uiScene = this.scene.scene.get('UIScene')
    // add our player to the scene
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scale = 0.6;
    this.refreshBody();
    this.body.setSize(12, 75)
    this.body.setOffset(1,-9);
    this.setScale(1.5)
    this.body.y+=5
    // enable physic3
    // this.scene.physics.world.enable(this);
    // this.body.setSize(20, 30)
    // this.setCollideWorldBounds(true);

    scene.anims.create({
      key: 'checkPointIdleAnim',
      frames: scene.anims.generateFrameNumbers('checkPointIdle', { start: 0, end: 9 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: -1
    });

    scene.anims.create({
      key: 'checkPointOutAnim',
      frames: scene.anims.generateFrameNumbers('checkPointOut', { start: 0, end: 9 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: 0
    });

    scene.anims.create({
      key: 'checkPointNoFlagAnim',
      frames: scene.anims.generateFrameNumbers('checkPointNoFlag', { start: 0, end: 0 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: 0
    });

    this.anims.play('checkPointNoFlagAnim', true)
    this.uiScene.events.on('collectedAll', this.onCollectedAll)
  }

  onCollectedAll = () => {
      this.enableCheckpoint = true;
      this.anims && this.anims.play('checkPointIdleAnim', true)
  }

  overlapCheckpoint = (beforeCallback = () => { }) => {
    if (this.enableCheckpoint) {
      beforeCallback();
      return new Promise(resolve => {
      this.enableCheckpoint = false;
        this.anims.play('checkPointOutAnim', true)
        this.scene.time.delayedCall(500, () => resolve(true), [], this)
      })
    }
    return this.enableCheckpoint;
  }
}
