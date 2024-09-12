import Basket from "../objects/basket.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.basket = new Basket(this, 400, 550, "basket");
    this.objects = this.physics.add.group({
      key: "object",
      repeat: 10,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.physics.add.collider(
      this.basket,
      this.objects,
      this.catchObject,
      null,
      this
    );
  }

  update() {
    this.basket.update();
  }

  catchObject(basket, object) {
    object.disableBody(true, true);
    // Add scoring logic here
  }
}
