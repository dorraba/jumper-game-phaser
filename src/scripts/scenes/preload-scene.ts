import { GAME_WIDTH, GAME_HEIGHT, CAMERA_ZOOM, IS_MOBILE, TERRAIN_SIZE, TRAMPOLINE_SIZE_X, TRAMPOLINE_SIZE_Y, PLAYER_SIZE, CAMERA_LERP, CHECKPOINT_SIZE, FRUIT_SIZE, SPIKE_SIZE_X, SPIKE_SIZE_Y, PLAYER_DEAD_SIZE, LIVES_COUNT, GRAVITY_Y, FLOATING_TERRAIN_Y, FLOATING_TERRAIN_X, FALLING_PLATFORM_Y, FALLING_PLATFORM_X, SAW_SIZE_X, SAW_SIZE_Y } from "../common/consts";

export class PreloadScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey: any;
  constructor() {
    super({
      key: "PreloadScene", active: true
    });
  }

  preload() {
    this.load.spritesheet('TerrainTileset', '../assets/raw/Terrain/Terrain (16x16).png', {frameWidth: TERRAIN_SIZE, frameHeight: TERRAIN_SIZE});
    this.load.spritesheet('playerIdle', '../assets/raw/Main Characters/Virtual Guy/Idle (32x32).png', {frameWidth: PLAYER_SIZE, frameHeight: PLAYER_SIZE})
    this.load.spritesheet('playerRun', '../assets/raw/Main Characters/Virtual Guy/Run (32x32).png', {frameWidth: PLAYER_SIZE, frameHeight: PLAYER_SIZE})
    this.load.spritesheet('playerJump', '../assets/raw/Main Characters/Virtual Guy/Jump (32x32).png', {frameWidth: PLAYER_SIZE, frameHeight: PLAYER_SIZE})
    this.load.spritesheet('playerFall', '../assets/raw/Main Characters/Virtual Guy/Fall (32x32).png',{frameWidth: PLAYER_SIZE, frameHeight: PLAYER_SIZE})
    this.load.spritesheet('playerDisappear', '../assets/raw/Main Characters/Desappearing (96x96).png',{frameWidth: PLAYER_DEAD_SIZE, frameHeight: PLAYER_DEAD_SIZE})
    this.load.spritesheet('checkPointIdle', '../assets/raw/Items/Checkpoints/Checkpoint/Checkpoint (Flag Idle)(64x64).png',{frameWidth: CHECKPOINT_SIZE, frameHeight: CHECKPOINT_SIZE})
    this.load.spritesheet('checkPointOut', '../assets/raw/Items/Checkpoints/Checkpoint/Checkpoint (Flag Out) (64x64).png',{frameWidth: CHECKPOINT_SIZE, frameHeight: CHECKPOINT_SIZE})
    this.load.spritesheet('checkPointNoFlag', '../assets/raw/Items/Checkpoints/Checkpoint/Checkpoint (No Flag).png',{frameWidth: CHECKPOINT_SIZE, frameHeight: CHECKPOINT_SIZE})
    this.load.spritesheet('fruit_apple', '../assets/raw/Items/Fruits/Apple.png',{frameWidth: FRUIT_SIZE, frameHeight: FRUIT_SIZE})
    this.load.spritesheet('fruit_banana', '../assets/raw/Items/Fruits/Bananas.png',{frameWidth: FRUIT_SIZE, frameHeight: FRUIT_SIZE})
    this.load.spritesheet('fruit_cherries', '../assets/raw/Items/Fruits/Cherries.png',{frameWidth: FRUIT_SIZE, frameHeight: FRUIT_SIZE})
    this.load.spritesheet('fruit_kiwi', '../assets/raw/Items/Fruits/Kiwi.png',{frameWidth: FRUIT_SIZE, frameHeight: FRUIT_SIZE})
    this.load.spritesheet('fruit_melon', '../assets/raw/Items/Fruits/Melon.png',{frameWidth: FRUIT_SIZE, frameHeight: FRUIT_SIZE})
    this.load.spritesheet('fruit_orange', '../assets/raw/Items/Fruits/Orange.png',{frameWidth: FRUIT_SIZE, frameHeight: FRUIT_SIZE})
    this.load.spritesheet('fruit_pineapple', '../assets/raw/Items/Fruits/Pineapple.png',{frameWidth: FRUIT_SIZE, frameHeight: FRUIT_SIZE})
    this.load.spritesheet('fruit_strawberry', '../assets/raw/Items/Fruits/Strawberry.png',{frameWidth: FRUIT_SIZE, frameHeight: FRUIT_SIZE})
    this.load.spritesheet('fruit_collected', '../assets/raw/Items/Fruits/Collected.png',{frameWidth: FRUIT_SIZE, frameHeight: FRUIT_SIZE})
    this.load.spritesheet('spike_blink', '../assets/raw/Traps/Spike Head/Blink (54x52).png',{frameWidth: SPIKE_SIZE_X, frameHeight: SPIKE_SIZE_Y})
    this.load.spritesheet('spike_hit', '../assets/raw/Traps/Spike Head/Bottom Hit (54x52).png',{frameWidth: SPIKE_SIZE_X, frameHeight: SPIKE_SIZE_Y})
    this.load.spritesheet('floatingTerrain1', '../assets/raw/Terrain/floatingTerrain1.png',{frameWidth: FLOATING_TERRAIN_X, frameHeight: FLOATING_TERRAIN_Y})
    this.load.spritesheet('floatingTerrain2', '../assets/raw/Terrain/floatingTerrain2.png',{frameWidth: FLOATING_TERRAIN_X, frameHeight: FLOATING_TERRAIN_Y})
    this.load.spritesheet('floatingTerrain3', '../assets/raw/Terrain/floatingTerrain3.png',{frameWidth: FLOATING_TERRAIN_X, frameHeight: FLOATING_TERRAIN_Y})
    this.load.spritesheet('fallingPlatformOn', '../assets/raw/Traps/Falling Platforms/On (32x10).png',{frameWidth: FALLING_PLATFORM_X, frameHeight: FALLING_PLATFORM_Y})
    this.load.spritesheet('fallingPlatformOff', '../assets/raw/Traps/Falling Platforms/Off.png',{frameWidth: FALLING_PLATFORM_X, frameHeight: FALLING_PLATFORM_Y})
    this.load.spritesheet('sawOn', '../assets/raw/Traps/Saw/On (38x38).png',{frameWidth: SAW_SIZE_X, frameHeight: SAW_SIZE_Y})
    this.load.spritesheet('sawOff', '../assets/raw/Traps/Saw/Off.png',{frameWidth: SAW_SIZE_X, frameHeight: SAW_SIZE_Y})
    this.load.spritesheet('trampolineIdle', '../assets/raw/Traps/Trampoline/Idle.png',{frameWidth: SAW_SIZE_X, frameHeight: SAW_SIZE_Y})
    this.load.spritesheet('trampolineJump', '../assets/raw/Traps/Trampoline/Jump (28x28).png', { frameWidth: TRAMPOLINE_SIZE_X, frameHeight: TRAMPOLINE_SIZE_Y })
    this.load.audio('jump', ['../assets/sounds/jump.wav']);
    this.load.audio('killed', ['../assets/sounds/killed.wav']);
    this.load.audio('collect', ['../assets/sounds/collect.wav']);
    this.load.audio('gameover', ['../assets/sounds/gameover.wav']);
    this.load.audio('finish', ['../assets/sounds/finish.wav']);
  }

  create(): void {
    this.scene.start("StartScene")
  }
}
