export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture, enemy) {
    super(scene.matter.world, x, y, texture);
    scene.add.existing(this);

    this.enemy = enemy;

    this.speed = 3;
    this.maxSpeed = 5;
    this.acceleration = 0.5;
    this.friction = 0.06;

    this.jumpForce = -10;
    this.isJumping = false;
    this.isGrounded = false;

    this.isAttacking = false;

    this.setRectangle(20, 25);
    this.setDisplaySize(100, 70);
    let offsetOfRectangle = {
      x: 0,
      y: -9,
    };
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

    this.scene.matter.world.on("collisionactive", (event) => {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA === this.body || bodyB === this.body) {
          const otherBody = bodyA === this.body ? bodyB : bodyA;

          if (otherBody.label === "ground") {
            this.isGrounded = true;
          }
        }
      });
    });

    this.scene.matter.world.on("collisionend", (event) => {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA === this.body || bodyB === this.body) {
          const otherBody = bodyA === this.body ? bodyB : bodyA;

          if (otherBody.label === "ground") {
            this.isGrounded = false;
          }
        }
      });
    });
  }

  isAnyKeyDown(keys) {
    return keys.some((key) => key.isDown);
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

      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        this.isAttacking = false;
        this.enemy.destroy();
      });
    }
  }
}
