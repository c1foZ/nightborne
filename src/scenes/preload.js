export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("player", "assets/images/player.png");
  }

  create() {
    this.scene.start("GameScene");
  }
}
