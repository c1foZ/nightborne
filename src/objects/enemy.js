export default class Enemy extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture, player) {
    super(scene.matter.world, x, y, texture);
    scene.add.existing(this);

    this.player = player;
    this.speed = 2;
    this.setRectangle(10, 25);
    this.setDisplaySize(100, 70);

    this.setBounce(0.05);
    this.setFixedRotation();
    this.setFrictionAir(0.01);
    this.setFriction(0.1);
  }

  update() {
    if (!this.body) return;
    if (!this.player) return;
    let playerX = this.player.x;
    let directionX = playerX - this.x;
    let distance = Math.abs(directionX);
    let walkDirection = directionX / distance;

    if (walkDirection > 0) {
      this.setFlipX(false);
    } else {
      this.setFlipX(true);
    }

    if (this.body.velocity.y === 0) {
      this.setVelocityX(walkDirection * this.speed);
    } else {
      this.setVelocityX(0);
    }
  }
}
