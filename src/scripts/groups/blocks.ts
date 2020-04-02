export class Blocks extends Phaser.Tilemaps.StaticTilemapLayer {
  constructor(scene, map) {
    const tileSet = map.addTilesetImage('TerrainTileset');
    super(scene, map, map.layers.findIndex(x => x.name === 'blocks'), tileSet, 0, 0);
    this.scene = scene;
    this.scene.add.existing(this);
    // this.scene.physics.add.existing(this, true);
    // this.scene.physics.world.enable(this);
    this.setCollisionByExclusion([-1]);
  }
}
