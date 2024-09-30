import { createGround } from "../objects/ground.js";
import Player from "../objects/player.js";
import Enemy from "../objects/enemy.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
    this.enemies = [];
  }

  create() {
    const { width, height } = this.sys.game.config;
    const startingX = 100;
    const startingY = 800;
    const idleAnim = "idle_spritesheet";
    const runAnim = "run_spritesheet";
    const attackAnim = "attack_spritesheet";
    const enemyAnim = "enemy_walk_spritesheet";

    this.add
      .image(width / 2, height / 2, "background")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height)
      .setScrollFactor(0);

    this.matter.world.setBounds(0, 0, width, height);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames(idleAnim, {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNames(runAnim, {
        frames: [0, 1, 2, 3, 4, 5],
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNames(attackAnim, {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),
      frameRate: 15,
    });

    this.anims.create({
      key: "enemyWalk",
      frames: this.anims.generateFrameNames(enemyAnim, {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 15,
      repeat: -1,
    });

    createGround(this);

    this.player = new Player(this, startingX, startingY, idleAnim);
    this.player.setScale(3);
    this.player.play("idle");
    this.player.postFX.addGlow(undefined, undefined, undefined, false, 0.1, 1);

    this.createEnemy(1520, 700);
    this.createEnemy(1720, 300);

    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.createEnemy(1720, 300);
      },
      loop: true,
    });
  }

  createEnemy(x, y) {
    const enemy = new Enemy(this, x, y, "enemy_walk_spritesheet", this.player);
    enemy.setScale(4);
    enemy.play("enemyWalk");

    let glowOn = true;
    this.time.addEvent({
      delay: 300,
      repeat: 10,
      callback: () => {
        if (glowOn) {
          enemy.postFX.clear();
        } else {
          enemy.postFX.addGlow(0xff0000, undefined, undefined, false, 0.2, 5);
        }
        glowOn = !glowOn;
      },
      callbackScope: this,
    });

    this.enemies.push(enemy);
  }

  update() {
    this.player.update();

    this.enemies.forEach((enemy) => {
      enemy.update();
    });
  }
}
