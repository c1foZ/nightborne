import PreloadScene from "./scenes/preload.js";
import GameScene from "./scenes/game.js";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: "#cf7800",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
    },
  },
  scene: [PreloadScene, GameScene],
};

const game = new Phaser.Game(config);
