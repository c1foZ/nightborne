import Player from "../objects/player.js";
import { createGround } from "../objects/ground.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.matter.world.setBounds(0, 0, 1280, 720);
    createGround(this);
    this.player = new Player(this, 100, 560, "player");
  }

  update() {
    this.player.update();
  }
}
