import { ANIMATION_FRAME_RATE } from "../common/consts";
import { PathFollowerSprite } from "./pathFollowerSprite";

export class Saw extends PathFollowerSprite {
  constructor(scene, rect: any, tweenOptions: Object = {}, reverse?) {
    super(scene, 'sawOn', rect, tweenOptions, reverse)
    scene.anims.create({
      key: `sawOnAnim`,
      frames: scene.anims.generateFrameNumbers(`sawOn`, { start: 0, end: 7 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: -1,
    });

    this.anims.play(`sawOnAnim`, true)
  }
}
