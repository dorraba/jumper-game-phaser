/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Player } from "../sprites/player";
import { Blocks } from "../groups/blocks";
import { FIRST_LEVEL_ID } from '../common/levels';
import { GAME_WIDTH, GAME_HEIGHT, CAMERA_ZOOM, CAMERA_HEIGHT, TERRAIN_SIZE, TRAMPOLINE_SIZE_X, TRAMPOLINE_SIZE_Y, PLAYER_SIZE, CAMERA_LERP, CHECKPOINT_SIZE, FRUIT_SIZE, SPIKE_SIZE_X, SPIKE_SIZE_Y, PLAYER_DEAD_SIZE, LIVES_COUNT, GRAVITY_Y, FLOATING_TERRAIN_Y, FLOATING_TERRAIN_X, FALLING_PLATFORM_Y, FALLING_PLATFORM_X, SAW_SIZE_X, SAW_SIZE_Y, IS_MOBILE } from "../common/consts";
import { Checkpoint } from "../sprites/checkpoint";
import { Fruit } from "../sprites/fruit";
import { Saw } from "../sprites/saw";
import { Spike } from "../sprites/spike";
import gameData from '../common/gameData';
import { FollowerVelocitySprite } from "../sprites/followerVelocitySprite";
import { FloatingPlatform } from "../sprites/flatingPlatform";
import { FallingPlatform } from "../sprites/fallingPlatform";
import { Trampoline } from "../sprites/trampoline";
import { LEVELS } from "../common/levels";

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private background: Phaser.GameObjects.TileSprite;
  private map: Phaser.Tilemaps.Tilemap;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private player: Player;
  private checkpoint: Checkpoint;
  private blocks: Blocks;
  private fruits: Array<Fruit>;
  private spikes: Array<any>;
  private saws: Array<any>;
  private bottomBoundRect: Phaser.GameObjects.Rectangle;
  private uiScene: Phaser.Scene;
  private gameRestarting: boolean = false;
  private followersGroup: Phaser.GameObjects.Group;
  private fallingPlatformsGroup: Phaser.GameObjects.Group;
  private trampolines: Array<Trampoline>;
  private sounds: Array<any> = [];

  constructor(private level = LEVELS[FIRST_LEVEL_ID]) {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    Object.values(LEVELS).forEach(level => {
      this.load.tilemapTiledJSON(level.id, `../assets/levels/${level.id}.json`)
      this.load.image(`background_${level.id}`, `../assets/raw/Background/${level.background}.png`);
    })
  }

  create(): void {
    this.addSounds();
    this.updateScenes();
    this.addBackground();
    this.createMap();
    this.addSprites();
    this.updateUIScene();
    this.setCollisions();
    this.setCamera();
    this.initKeyboard();

    this.scale.on('orientationchange', (orientation) => {
      this.scale.updateOrientation()
      this.time.delayedCall(500, this.setCamera, [], this)
    });
  }

  addSounds = () => {
    this.sounds['killed'] = this.sound.add('killed');
    this.sounds['finish'] = this.sound.add('finish');
    this.sounds['collect'] = this.sound.add('collect');
    this.sounds['gameover'] = this.sound.add('gameover');
  }

  updateScenes = () => {
    this.physics.world.setBounds(0, 0, this.level.levelWidth, this.level.levelHeight)
    this.scene.stop('GameOverScene')
    this.scene.stop('')
    this.gameRestarting = false;
    this.uiScene = this.scene.get('UIScene')
    if (IS_MOBILE) {
      document.getElementById('game').style.width = 960 + 'px';
    }
    this.game.scale.setGameSize(IS_MOBILE ? this.level.width : 960, this.level.height)
  }

  addBackground = () => {
    this.background = this.add.tileSprite(this.level.levelWidth / 2, this.level.levelHeight / 2, this.level.levelWidth, this.level.levelHeight, `background_${this.level.id}`)
  }

  createMap = () => {
    this.map = this.make.tilemap({ key: this.level.id });
  }

  addSprites = () => {
    this.sounds['collect'].play();
    const checkpointCoords = this.map.objects.find(x => x.name === "checkpoint")?.objects[0];
    const playerCoords = this.map.objects.find(x => x.name === "player")?.objects[0];
    const fruitsCoords = this.map.objects.find(x => x.name === "fruits")?.objects || [];
    const bottomLineCoords = this.map.objects.find(x => x.name === "bottomLine")?.objects || [];
    const spikesCoords = this.map.objects.find(x => x.name === "spikes")?.objects || [];
    const sawsCoords = this.map.objects.find(x => x.name === "saws")?.objects || [];
    const fallingPlatformsCoords = this.map.objects.find(x => x.name === "fallingPlatforms")?.objects || [];
    const followersCoords = this.map.objects.find(x => x.name === "followers")?.objects || [];
    const trampolineCoords = this.map.objects.find(x => x.name === "trampolines")?.objects || [];

    this.fallingPlatformsGroup = this.add.group();
    fallingPlatformsCoords.forEach(coord => {
      const duration = coord.properties?.find(x => x.name === 'duration')?.value;
      const reverse = coord.properties?.find(x => x.name === 'reverse')?.value;
      this.fallingPlatformsGroup.add(new FallingPlatform(this, [[coord.x, coord.y]], duration, reverse))
    })


    this.spikes = spikesCoords.map(coord => {
      const duration = coord.properties?.find(x => x.name === 'duration')?.value;
      const reverse = coord.properties?.find(x => x.name === 'reverse')?.value;
      let options = {}
      if (duration) {
        options = { duration };
      }
      const { x, y, width, height } = coord;
      return new Spike(this, { x, y, width, height }, options, reverse)
    })

    this.saws = sawsCoords.map(coord => {
      const duration = coord.properties?.find(x => x.name === 'duration')?.value;
      const reverse = coord.properties?.find(x => x.name === 'reverse')?.value;
      let options = {}
      if (duration) {
        options = { duration };
      }
      const { x, y, width, height } = coord;
      return new Saw(this, { x, y, width, height }, options, reverse)
    })

    this.blocks = new Blocks(this, this.map)
    this.player = new Player(this, playerCoords?.x, playerCoords?.y);

    this.followersGroup = this.add.group()
    followersCoords.forEach(coord => {
      const type = coord.properties?.find(x => x.name === 'type')?.value;
      const duration = coord.properties?.find(x => x.name === 'duration')?.value;
      const reverse = coord.properties?.find(x => x.name === 'reverse')?.value;
      this.followersGroup.add(new FloatingPlatform(this, type, [[coord.x, coord.y], [coord.x + coord.width, coord.y + coord.height]], duration, reverse))
    })

    this.fruits = fruitsCoords.map(coord => {
      const fruitType = coord.properties?.find(x => x.name === 'type')?.value;
      return new Fruit(this, coord.x, coord.y, fruitType);
    })

      const coord = bottomLineCoords[0]
      this.bottomBoundRect = this.add.rectangle(coord.x, coord.y, coord.width, coord.height, 0x000000, 0).setOrigin(0, 0)

    this.trampolines = trampolineCoords.map((coord) => new Trampoline(this, coord.x, coord.y));

    this.checkpoint = new Checkpoint(this, checkpointCoords?.x, checkpointCoords?.y);
    this.physics.add.existing(this.bottomBoundRect, true)

  }

  updateUIScene = () => {
    this.uiScene.events.emit('setTotalToCollect', this.fruits.length);
  }

  setCollisions = () => {
    this.physics.add.collider(this.blocks, this.player);
    this.physics.add.collider(this.followersGroup, this.player)
    this.physics.add.collider(this.trampolines, this.player, (trampoline: Trampoline, player) => {
      if (trampoline.body.touching.up) {
        trampoline.jump();
        this.player.playJump();
        this.player.setVelocityY(-1600)
      }
    })
    this.physics.add.collider(this.fallingPlatformsGroup, this.player, (platform: FallingPlatform) => {
      if (platform.body.touching.up) {
        platform.stopFloating();
      }
    })

    this.physics.add.overlap(this.player, this.checkpoint, async () => {
      const shouldFinish = await this.checkpoint.overlapCheckpoint(() => {
        this.sounds['finish'].play();
        this.player.stopPlayer()
      });
      if (shouldFinish) {
        const nextLevel = Object.values(LEVELS).find(x => x.index === this.level.index + 1);
        this.level = nextLevel || LEVELS[FIRST_LEVEL_ID]
        if (nextLevel) {
          this.restart({ level: this.level.name })
        } else {
          this.finishGame();
        }
      }
    });
    this.physics.add.overlap(this.player, this.bottomBoundRect, () => this.restart({killed: true}));
    this.physics.add.overlap(this.player, this.fruits, (player, fruit: Fruit) => {
      fruit.onOverlap()
    })

    this.physics.add.overlap(this.player, [...this.spikes, ...this.saws], async (player: Player, spike: Spike) => {
      spike.onOverlap && await spike.onOverlap()
      player.killPlayer()
      this.restart({killed: true})
    })
  }

  restart = (options) => {
    if (this.gameRestarting) {
      return;
    }
    this.gameRestarting = true;
    this.cameras.main.fade(500);
    this.uiScene.events.removeAllListeners('collectedAll');
    if (options.killed) {
      this.sounds['killed'].play()
      this.player.killPlayer();
      gameData.lives--;
    }
    options.level = this.level
    const gameOver = !gameData.disableLives && gameData.lives < 0;
    options.gameOver = gameOver;
    this.time.delayedCall(450, () => {
      this.uiScene.events.emit('resetScore', options);
      if (gameOver) {
        this.sounds['gameover'].play();
        this.level = LEVELS[FIRST_LEVEL_ID];
        gameData.lives = LIVES_COUNT;
        this.gameOver();
      } else {
        this.scene.restart();
      }
    }, [], this.scene)
  }

  finishGame = () => {
    this.scene.pause('MainScene');
    this.scene.setVisible(false, 'UIScene');
    this.scene.start('FinishScene');
  }

  gameOver = () => {
    this.scene.pause('MainScene');
    this.scene.setVisible(false, 'UIScene');
    this.scene.start('GameOverScene');
  }

  setCamera = () => {
    let viewportHeight = 0;
    const zoomedLevelHeight = this.level.levelHeight * CAMERA_ZOOM;
    if (zoomedLevelHeight < window.innerHeight) {
      viewportHeight = (window.innerHeight - zoomedLevelHeight) / 2
    }
    this.cameras.main.setViewport(0, viewportHeight, 1000, 1000)
    this.cameras.main.zoomTo(CAMERA_ZOOM, 1000)
    const width = Math.min(window.innerWidth, this.level.levelWidth);
    this.cameras.main.setSize(width, window.innerHeight)
    this.cameras.main.setBounds(0, 0, this.level.levelWidth, this.level.levelHeight);
    this.cameras.main.startFollow(this.player, false, CAMERA_LERP, CAMERA_LERP)
  }

  initKeyboard = () => {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(): void {
    this.player.update(this.cursors);
    this.spikes.forEach(x => x.update())
    this.saws.forEach(x => x.update())
  }
}
