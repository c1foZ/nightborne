import Player from "../objects/player.js";
import { createGround } from "../objects/ground.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    const { width, height } = this.sys.game.config;
    const startingX = 100;
    const startingY = 800;
    const idleAnim = "idle_spritesheet";
    const runAnim = "run_spritesheet";
    const attackAnim = "attack_spritesheet";

    this.add
      .image(width / 2, height / 2, "background")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height)
      .setScrollFactor(0);

    this.matter.world.setBounds(0, 0, width, height);

    const enemy = this.add.image(900, 900, "enemy");
    enemy.setScale(4);

    const idle = {
      key: "idle",
      frames: this.anims.generateFrameNames(idleAnim, {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      }),
      frameRate: 15,
      repeat: -1,
    };
    this.anims.create(idle);

    const run = {
      key: "run",
      frames: this.anims.generateFrameNames(runAnim, {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 15,
      repeat: -1,
    };
    this.anims.create(run);

    const attack = {
      key: "attack",
      frames: this.anims.generateFrameNames(attackAnim, {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),
      frameRate: 15,
    };
    this.anims.create(attack);

    createGround(this);

    this.player = new Player(this, startingX, startingY, idleAnim);
    this.player.setScale(3);
    this.player.play("idle");
    const fx = this.player.preFX.addGlow();
  }

  update() {
    this.player.update();
  }
}
