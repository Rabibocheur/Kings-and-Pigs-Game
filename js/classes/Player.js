class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations }) {
    super({ imageSrc, frameRate, animations });
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 30;
    this.height = 30;
    this.sides = {
      bottom: this.position.y + this.height,
    };

    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;
  }

  update() {
    this.position.x += this.velocity.x;

    this.updateHitBox();
    this.checkHorizontalCollision();
    this.applyGravity();
    this.updateHitBox();

    // ctx.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );

    this.checkVerticalCollision();
  }

  updateHitBox() {
    this.hitbox = {
      position: {
        x: this.position.x + 56,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop;
    this.currentAnimation = this.animations[name];
  }

  handleInput(keys) {
    if (this.preventInput) return;

    if (keys.d.pressed) {
      this.switchSprite("runRight");
      this.lastDirection = "right";
      this.velocity.x = 4;
    } else if (keys.q.pressed) {
      this.switchSprite("runLeft");
      this.lastDirection = "left";
      this.velocity.x = -4;
    } else {
      if (this.lastDirection === "right") this.switchSprite("idleRight");
      else if (this.lastDirection === "left") this.switchSprite("idleLeft");
    }
  }

  applyGravity() {
    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;
  }

  checkHorizontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  checkVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
