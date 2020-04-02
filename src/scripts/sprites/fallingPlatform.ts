import { ANIMATION_FRAME_RATE, FALLING_PLATFORM_DELAY } from "../common/consts";
import { FollowerVelocitySprite } from "./followerVelocitySprite";

export class FallingPlatform extends FollowerVelocitySprite {
  constructor(scene, private coords: Array<any> = [], duration?: number, reverse?: boolean) {
    super(scene, 'fallingPlatformOn', coords, duration, reverse)

    scene.anims.create({
      key: `fallingPlatformOnAnim`,
      frames: scene.anims.generateFrameNumbers(`fallingPlatformOn`, { start: 0, end: 4 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: -1
    });
    scene.anims.create({
      key: `fallingPlatformOffAnim`,
      frames: scene.anims.generateFrameNumbers(`fallingPlatformOn`, { start: 0, end: 0 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: 0
    });
``
    this.anims.play(`fallingPlatformOnAnim`, true)
  }

  stopFloating = () => {
    this.anims.play(`fallingPlatformOffAnim`, true)
    this.timer = this.scene.time.delayedCall(FALLING_PLATFORM_DELAY, () => {
      this.setVelocityY(1000);
      this.timer = this.scene.time.delayedCall(FALLING_PLATFORM_DELAY * 3, () => {
        this.anims.play(`fallingPlatformOnAnim`, true)
        this.setVelocityY(0);
        this.setPosition(this.coords[0][0], this.coords[0][1])
      }, [], this)
    }, [], this)
  }
}
