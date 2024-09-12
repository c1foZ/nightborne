export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("basket", "assets/images/basket.png");
    console.log("image basket loaded");
    this.load.image("object", "assets/images/object.png");
  }

  create() {
    this.scene.start("GameScene");
  }
}
