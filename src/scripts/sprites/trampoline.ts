import { ANIMATION_FRAME_RATE } from "../common/consts";
import { FollowerVelocitySprite } from "./followerVelocitySprite";

export class Trampoline extends FollowerVelocitySprite {
  constructor(scene, x, y) {
    super(scene, 'trampolineIdle', [[x, y]])
    this.setSize(28, 14)
    this.setOffset(0, 15)

    scene.anims.create({
      key: `trampolineJumpAnim`,
      frames: scene.anims.generateFrameNumbers(`trampolineJump`, { start: 0, end: 7 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: 0,
    });
  }

  jump = () => {
    this.anims.play('trampolineJumpAnim', true);
  }
}
