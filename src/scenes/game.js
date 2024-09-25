import { createGround } from "../objects/ground.js";
import Player from "../objects/player.js";
import Enemy from "../objects/enemy.js";

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
    const enemyAnim = "enemy_walk_spritesheet";

    this.add
      .image(width / 2, height / 2, "background")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height)
      .setScrollFactor(0);

    this.matter.world.setBounds(0, 0, width, height);

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

    const enemyWalk = {
      key: "enemyWalk",
      frames: this.anims.generateFrameNames(enemyAnim, {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 15,
      repeat: -1,
    };
    this.anims.create(enemyWalk);

    createGround(this);

    this.player = new Player(this, startingX, startingY, idleAnim, null);
    this.player.setScale(3);
    this.player.play("idle");
    this.player.postFX.addGlow(undefined, undefined, undefined, false, 0.1, 1);

    this.enemy = new Enemy(this, 1520, 700, enemyAnim, this.player);
    this.player.enemy = this.enemy;
    this.enemy.setScale(4);
    this.enemy.play("enemyWalk");
    let glowOn = true;
    this.time.addEvent({
      delay: 300,
      repeat: 10,
      callback: () => {
        if (glowOn) {
          this.enemy.postFX.clear();
        } else {
          this.enemy.postFX.addGlow(
            0xff0000,
            undefined,
            undefined,
            false,
            0.2,
            5
          );
        }
        glowOn = !glowOn;
      },
      callbackScope: this,
    });
  }

  update() {
    this.player.update();
    this.enemy.update();
  }
}
