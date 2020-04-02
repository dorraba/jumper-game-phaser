import { ANIMATION_FRAME_RATE, JUMP_VELOCITY, RUN_VELOCITY } from "../common/consts";

export class Player extends Phaser.Physics.Arcade.Sprite {
  private uiScene: Phaser.Scene;
  private upKey: any;
  private spaceKey: any;
  private jumpPressed: number = 0;
  private disableKeys: Boolean = false;
  private sounds: Array<any> = [];

  constructor(scene, x, y) {
    super(scene, x, y, 'playerIdle')

    this.scene = scene;
    this.uiScene = this.scene.scene.get('UIScene')
    // add our player to the scene
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // enable physic3
    this.body.setSize(14, 26)
    this.body.setOffset(9, 5);
    this.setScale(1.5)
    this.scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);

    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('playerIdle', { start: 0, end: 10 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: -1
    });

    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('playerRun', { start: 0, end: 10 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: -1
    });

    scene.anims.create({
      key: 'jump',
      frames: scene.anims.generateFrameNumbers('playerJump', { start: 0, end: 0 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: -1
    });

    scene.anims.create({
      key: 'fall',
      frames: scene.anims.generateFrameNumbers('playerFall', { start: 0, end: 0 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: -1
    });

    scene.anims.create({
      key: 'dead',
      frames: scene.anims.generateFrameNumbers('playerDisappear', { start: 0, end: 6 }),
      frameRate: ANIMATION_FRAME_RATE,
      repeat: 0
    });

    this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.sounds['jump'] = this.scene.sound.add('jump');

  }

  stopPlayer = () => {
    this.anims.play('idle', true)
    this.disableKeys = true;
    this.setVelocityX(0)
  }

  killPlayer = () => {
    this.stopPlayer();
    this.anims.playReverse('dead', true)
    this.scene.time.delayedCall(200, this.destroy, [], this)
  }

  playJump = () => {
    this.sounds['jump'].play()
  }

  update(cursors) {
    if (this.disableKeys) {
      return;
    }
    // check if the up or down key is pressed
    if (this.body.blocked.down || this.body.touching.down) {
      this.body.velocity.x === 0 && this.anims.play('idle', true)
      this.jumpPressed = 0;
    } else {
      this.body.velocity.y < 0 ? this.anims.play('jump') : this.anims.play('fall')
    }
    if ((Phaser.Input.Keyboard.JustDown(this.upKey) || Phaser.Input.Keyboard.JustDown(this.spaceKey)) && this.jumpPressed < 2) {
      this.jumpPressed++;
      this.setVelocityY(Math.min(0, this.body.velocity.y) - JUMP_VELOCITY);
      this.sounds['jump'].play()
    }
    else if (cursors.left.isDown) {
      this.setVelocityX(RUN_VELOCITY * -1);
      this.flipX = true;
      if (this.body.blocked.down) {
        this.anims.play('run', true)
      }
    } else if (cursors.right.isDown) {
      this.setVelocityX(RUN_VELOCITY);
      this.flipX = false;
      if (this.body.blocked.down) {
        this.anims.play('run', true)
      }
    } else {
      this.setVelocityX(0);
      this.body.blocked.down && this.anims.play('idle', true)
    }
  }
}
