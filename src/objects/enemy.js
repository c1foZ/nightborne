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

    this.enemyHitBox = null;
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

    if (this.body.velocity.y === 0) {
      this.setVelocityX(walkDirection * this.speed);
    } else {
      this.setVelocityX(0);
    }

    if (Math.abs(directionX) < 100) {
      this.play("enemyAttack", true);
      console.log("I will kill you!");
      this.scene.time.delayedCall(500, () => {
        if (!this.enemyHitBox) {
          this.enemyHitBox = this.scene.matter.add.rectangle(
            this.x + (this.flipX ? -70 : 70),
            this.y,
            70,
            120,
            {
              isStatic: true,
              isSensor: true,
              ignoreGravity: true,
              label: "enemyHitBox",
            }
          );
        } else {
          this.enemyHitBox.position.x = this.x + (this.flipX ? -70 : 70);
          this.enemyHitBox.position.y = this.y;
        }

        // this.scene.time.delayedCall(100, () => {
        //   if (this.enemyHitBox) {
        //     this.scene.matter.world.remove(this.enemyHitBox);
        //     this.enemyHitBox = null;
        //   }
        // });
      });
    } else {
      this.play("enemyWalk", true);
    }
  }
}
