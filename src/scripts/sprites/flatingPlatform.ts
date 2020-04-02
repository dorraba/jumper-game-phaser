import { ANIMATION_FRAME_RATE } from "../common/consts";
import { FollowerVelocitySprite } from "./followerVelocitySprite";

export class FloatingPlatform extends FollowerVelocitySprite {
  constructor(scene, type, coords: Array<any> = [], duration?: number, reverse?: boolean) {
    super(scene, type, coords, duration, reverse)
  }
}
