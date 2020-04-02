import { ANIMATION_FRAME_RATE, GRAVITY_Y } from "../common/consts";

export class FollowerVelocitySprite extends Phaser.Physics.Arcade.Sprite {
  private uiScene: Phaser.Scene;
  private velocityX: number;
  private velocityY: number;
  protected timer: Phaser.Time.TimerEvent;

  constructor(scene, type, coords: Array<any> = [], duration = 2000, reverse = false) {
    const a = [coords[0][0], coords[0][1]];
    const b = coords[1] ? [coords[1][0], coords[1][1]] : a;
    const startPoint = reverse ? b : a;
    const endPoint = reverse ? a : b;
    super(scene, startPoint[0], startPoint[1], type, 0)
    this.scene = scene;
    this.uiScene = this.scene.scene.get('UIScene')
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this)

    this.setGravityY(GRAVITY_Y * -1)
    this.setImmovable(true)
    if (endPoint) {
      this.velocityX = (endPoint[0] - startPoint[0]) / (duration / 1000)
      this.setVelocityX(this.velocityX)
      this.velocityY = (endPoint[1] - startPoint[1]) / (duration / 1000)
      this.setVelocityY(this.velocityY)

      this.timer = this.scene.time.addEvent({
        delay: duration, loop: true, callback: () => {
          this.velocityX*=-1
          this.velocityY*=-1
          this.setVelocityX(this.velocityX);
          this.setVelocityY(this.velocityY);
      }})
    }
  }

  clearTimer() {
    this.timer && this.timer.destroy();
  }
}
