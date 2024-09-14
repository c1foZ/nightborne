export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture);
    scene.add.existing(this);

    this.speed = 10;
    this.jumpSpeed = -30;
    this.setRectangle(100, 100);
    this.setBounce(0.05);
    this.setFixedRotation();
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.setVelocityX(-this.speed);
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed);
    } else {
      this.setVelocityX(0);
    }

    if (cursors.up.isDown && this.body.velocity.y == 0) {
      this.setVelocityY(this.jumpSpeed);
    }
  }
}
