export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture);
    scene.add.existing(this);

    this.speed = 3;
    this.maxSpeed = 5;
    this.acceleration = 0.5;
    this.friction = 0.06;

    this.jumpForce = -10;
    this.isJumping = false;
    this.isGrounded = false;

    this.isAttacking = false;
    this.swordHitBox = null;

    this.setRectangle(20, 25);
    this.setDisplaySize(100, 70);
    let offsetOfRectangle = { x: 0, y: -9 };
    let body = this.body;
    body.position.x += offsetOfRectangle.x;
    body.position.y += offsetOfRectangle.y;
    body.positionPrev.x += offsetOfRectangle.x;
    body.positionPrev.y += offsetOfRectangle.y;

    this.setBounce(0.05);
    this.setFixedRotation();
    this.setFrictionAir(0.01);
    this.setFriction(0);

    this.cursors = {
      left: [
        scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      ],
      right: [
        scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      ],
      jump: [
        scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      ],
      attack: [scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)],
    };

    this.scene.matter.world.on("collisionactive", this.handleCollisions, this);
    this.scene.matter.world.on("collisionend", this.handleCollisionEnd, this);
  }

  isAnyKeyDown(keys) {
    return keys.some((key) => key.isDown);
  }

  handleCollisions(event) {
    event.pairs.forEach(({ bodyA, bodyB }) => {
      const otherBody = bodyA === this.body ? bodyB : bodyA;

      if (bodyA === this.body || bodyB === this.body) {
        if (otherBody.label === "ground") {
          this.isGrounded = true;
        }
      }

      if (this.swordHitBox) {
        const enemies = this.scene.enemies || [];
        enemies.forEach((enemy) => {
          if (
            (bodyA === this.swordHitBox && bodyB === enemy.body) ||
            (bodyB === this.swordHitBox && bodyA === enemy.body)
          ) {
            this.handleSwordHit(enemy.body);
          }
        });
      }
    });
  }

  handleCollisionEnd(event) {
    event.pairs.forEach(({ bodyA, bodyB }) => {
      const otherBody = bodyA === this.body ? bodyB : bodyA;

      if (otherBody.label === "ground") {
        this.isGrounded = false;
      }
    });
  }

  handleSwordHit(enemyBody) {
    if (enemyBody.label === "enemy") {
      enemyBody.gameObject.destroy();
      console.log("Enemy destroyed!");
    }
  }

  update() {
    const velocity = this.body.velocity;

    if (this.isAnyKeyDown(this.cursors.left)) {
      this.setVelocityX(
        Phaser.Math.Clamp(velocity.x - this.acceleration, -this.maxSpeed, 0)
      );
      if (!this.isAttacking && this.anims.currentAnim.key !== "run") {
        this.play("run", true);
      }
      this.setFlipX(true);
    } else if (this.isAnyKeyDown(this.cursors.right)) {
      this.setVelocityX(
        Phaser.Math.Clamp(velocity.x + this.acceleration, 0, this.maxSpeed)
      );
      if (!this.isAttacking && this.anims.currentAnim.key !== "run") {
        this.play("run", true);
      }
      this.setFlipX(false);
    } else {
      this.setVelocityX(velocity.x * (1 - this.friction));
      if (!this.isAttacking && this.anims.currentAnim.key !== "idle") {
        this.play("idle", true);
      }
    }

    if (
      this.isAnyKeyDown(this.cursors.jump) &&
      this.isGrounded &&
      !this.isJumping
    ) {
      this.setVelocityY(this.jumpForce);
      this.isJumping = true;
    }

    if (this.isGrounded) {
      this.isJumping = false;
    }

    if (this.isAnyKeyDown(this.cursors.attack) && !this.isAttacking) {
      this.isAttacking = true;
      this.play("attack", true);

      this.scene.time.delayedCall(500, () => {
        if (!this.swordHitBox) {
          this.swordHitBox = this.scene.matter.add.rectangle(
            this.x + (this.flipX ? -70 : 70),
            this.y,
            70,
            120,
            {
              isStatic: true,
              isSensor: true,
              ignoreGravity: true,
              label: "swordHitBox",
            }
          );
        } else {
          this.swordHitBox.position.x = this.x + (this.flipX ? -70 : 70);
          this.swordHitBox.position.y = this.y;
        }
      });

      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.isAttacking = false;
        if (this.swordHitBox) {
          this.scene.matter.world.remove(this.swordHitBox);
          this.swordHitBox = null;
        }
      });
    }
  }
}
