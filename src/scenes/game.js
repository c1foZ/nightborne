import Player from "../objects/player.js";
import { createGround } from "../objects/ground.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("player", "assets/images/player.png");
    this.load.image("groundTexture", "assets/images/ground.png");
    this.load.image("background", "assets/images/background.png");

    this.load.spritesheet(
      "player_spritesheet",
      "assets/images/player_spritesheet.png",
      { frameWidth: 80, frameHeight: 80 }
    );
  }

  create() {
    const { width, height } = this.sys.game.config;

    this.add
      .image(width / 2, height / 2, "background")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height)
      .setScrollFactor(0);

    this.matter.world.setBounds(0, 0, width, height);

    createGround(this);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames("player_spritesheet", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.player = new Player(this, 100, 560, "player_spritesheet");
    this.player.play("idle");
  }

  update() {
    this.player.update();
  }
}
