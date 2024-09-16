export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  // preload() {
  //   this.load.image("player", "assets/images/player.png");
  //   this.load.image("groundTexture", "assets/images/ground.png");
  //   this.load.image("background", "assets/images/background.png");
  // }

  create() {
    this.scene.start("GameScene");
  }
}
