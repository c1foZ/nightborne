import { grounds } from "./groundDefinitions.js";

export default class Ground extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, width, height) {
    super(scene.matter.world, x, y, "groundTexture");
    scene.add.existing(this);

    this.setStatic(true);
    this.setDisplaySize(width, height);
    this.setRectangle(width, height);
  }
}

export function createGround(scene) {
  grounds.forEach((ground) => {
    const groundSprite = new Ground(
      scene,
      ground.x,
      ground.y,
      ground.width,
      ground.height
    );

    groundSprite.setStatic(true);
    scene.matter.world.add(groundSprite);
  });
}
