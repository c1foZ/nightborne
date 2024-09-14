import Player from "../objects/player.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.matter.world.setBounds(0, 0, 1280, 720);
    this.player = new Player(this, 200, 550, "player");
  }

  update() {
    this.player.update();
  }
}
