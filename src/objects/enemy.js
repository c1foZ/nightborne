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
    this.body.label = "enemy";

    this.isAttacking = false; // Track if the enemy is attacking
  }

  update() {
    if (!this.body || !this.player) return;

    let playerX = this.player.x;
    let directionX = playerX - this.x;
    let distance = Math.abs(directionX);
    let walkDirection = directionX / distance;

    if (walkDirection > 0) {
      this.setFlipX(false);
    } else {
      this.setFlipX(true);
    }

    if (this.body.velocity.y === 0 && !this.isAttacking) {
      this.setVelocityX(walkDirection * this.speed);
    } else {
      this.setVelocityX(0);
    }

    if (distance < 100) {
      this.attackPlayer();
    } else {
      this.isAttacking = false;
      this.play("enemyWalk", true);
    }
  }

  attackPlayer() {
    if (this.isAttacking) return;

    this.isAttacking = true;
    this.setVelocityX(0);
    this.play("enemyAttack", true);

    // Detect collision with the player
    const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
      this.getBounds(),
      this.player.getBounds()
    );

    if (overlap) {
      this.player.takeDamage(20); // Reduce player's health by 20
      console.log("Player hit by enemy!");
    }

    this.scene.time.delayedCall(500, () => {
      this.isAttacking = false;
    });
  }
}
