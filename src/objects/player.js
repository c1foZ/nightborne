export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture) {
    super(scene.matter.world, x, y, texture);
    scene.add.existing(this);

    this.speed = 10;
    this.jumpSpeed = -10;

    this.setRectangle(100, 100);
    this.setDisplaySize(100, 70);
    this.setBounce(0.05);
    this.setFixedRotation();

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
    };
  }

  isAnyKeyDown(keys) {
    return keys.some((key) => key.isDown);
  }

  update() {
    if (this.isAnyKeyDown(this.cursors.left)) {
      this.setVelocityX(-this.speed);
    } else if (this.isAnyKeyDown(this.cursors.right)) {
      this.setVelocityX(this.speed);
    } else {
      this.setVelocityX(0);
    }

    if (this.isAnyKeyDown(this.cursors.jump)) {
      this.setVelocityY(this.jumpSpeed);
    }
  }
}