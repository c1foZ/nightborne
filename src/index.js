import PreloadScene from "./scenes/preload.js";
import GameScene from "./scenes/game.js";

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
  },
  fps: {
    target: 60,
  },
  pixelArt: true,
  backgroundColor: "#1c0c01",
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 1 },
      debug: false,
    },
  },
  scene: [PreloadScene, GameScene],
  fx: {
    glow: {
      distance: 1,
      quality: 0.2,
    },
  },
};

const game = new Phaser.Game(config);
