export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.image("player", "assets/images/player.png");
    this.load.image("groundTexture", "assets/images/ground.png");
    this.load.image("background", "assets/images/background.png");
    this.load.spritesheet(
      "idle_spritesheet",
      "assets/images/idle_spritesheet.png",
      { frameWidth: 80, frameHeight: 80 }
    );
    this.load.spritesheet(
      "run_spritesheet",
      "assets/images/run_spritesheet.png",
      { frameWidth: 80, frameHeight: 80 }
    );
    this.load.spritesheet(
      "attack_spritesheet",
      "assets/images/attack_spritesheet.png",
      { frameWidth: 80, frameHeight: 80 }
    );

    this.load.spritesheet("enemy", "assets/images/enemy.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
  }

  create() {
    this.scene.start("GameScene");
  }
}
