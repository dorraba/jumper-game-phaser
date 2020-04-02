import { ANIMATION_FRAME_RATE } from "../common/consts";

export class PathFollowerSprite extends Phaser.Physics.Arcade.Sprite {
  private uiScene: Phaser.Scene;
  private path: Phaser.Curves.Path;
  private follower: any;

  constructor(scene, type, rect: any, tweenOptions: Object = {}, reverse = false) {
    super(scene, rect.x, rect.y, type)
    let points = [[rect.x, rect.y], [rect.x + rect.width, rect.y], [rect.x + rect.width, rect.y + rect.height], [rect.x, rect.y + rect.height], [rect.x, rect.y]]
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.scene = scene;
    this.uiScene = this.scene.scene.get('UIScene')
    this.setGravityY(-2000)


    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    if (reverse) {
      points = points.reverse()
    }
    this.path = new Phaser.Curves.Path(...points[0]);

    points.forEach(([coordX, coordY]) => this.path.lineTo(coordX, coordY));
    this.scene.tweens.add({
      targets: this.follower,
      t: 1,
      // ease: 'Sine.easeInOut',
      duration: 2000,
      yoyo: false,
      repeat: -1,
      ...tweenOptions
    });
  }

  update = () => {
    this.path.getPoint(this.follower.t, this.follower.vec);
    this.setPosition(this.follower.vec.x, this.follower.vec.y)
  }
}
