import PreloadScene from "./scenes/preload.js";
import GameScene from "./scenes/game.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },
  backgroundColor: "#1c0c01",
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 1 },
      debug: true,
    },
  },
  scene: [PreloadScene, GameScene],
};

const game = new Phaser.Game(config);
