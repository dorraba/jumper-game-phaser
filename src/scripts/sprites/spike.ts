import { ANIMATION_FRAME_RATE } from "../common/consts";
import { PathFollowerSprite } from "./pathFollowerSprite";

export class Spike extends PathFollowerSprite {
  constructor(scene, rect: any, tweenOptions: Object = {}, reverse?) {
    super(scene, 'spike_blink', rect, tweenOptions, reverse)
    this.setSize(42, 42)
    this.setOffset(7, 7)
    scene.anims.create({
      key: `spikeIdleAnim`,
      frames: scene.anims.generateFrameNumbers(`spike_blink`, { start: 0, end: 3 }),
      frameRate: ANIMATION_FRAME_RATE - 10,
      repeat: -1
    });

    scene.anims.create({
      key: 'spikeHitAnim',
      frames: scene.anims.generateFrameNumbers('spike_hit', { start: 0, end: 3 }),
      frameRate: ANIMATION_FRAME_RATE - 10,
      repeat: 0
    });

    this.anims.play(`spikeIdleAnim`, true)
  }


  onOverlap = () => {
    return new Promise(resolve => {
      this.anims.play(`spikeHitAnim`, true)
      this.scene.time.delayedCall(200, () => {
        this.destroy();
        resolve();
      }, [], this)
    })
  }
}
