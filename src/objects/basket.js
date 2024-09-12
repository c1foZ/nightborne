export default class Basket extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      this.setVelocityX(200);
    } else {
      this.setVelocityX(0);
    }
  }
}
