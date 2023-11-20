const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 64 * 16;
canvas.height = 64 * 9;

let parsedCollisions;
let collisionBlocks;
let background;
let door;
let level = 1;

const overlay = {
  opacity: 0,
};

const player = new Player({
  imageSrc: "./img/king/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./img/king/enterDoor.png",
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            if (level === 4) level = 1;
            levels[level].init();
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

const levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectFrom2D();

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      player.position.x = 200;
      player.position.y = 200;
      player.collisionBlocks = collisionBlocks;
      player.preventInput = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel1.png",
      });

      door = new Sprite({
        position: {
          x: 760,
          y: 272,
        },
        imageSrc: "./img/doorOpen.png",
        frameRate: 5,
        frameBuffer: 4,
        loop: false,
        autoplay: false,
      });
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectFrom2D();

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      player.position.x = 96;
      player.position.y = 140;
      player.collisionBlocks = collisionBlocks;
      player.preventInput = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel2.png",
      });

      door = new Sprite({
        position: {
          x: 772,
          y: 336,
        },
        imageSrc: "./img/doorOpen.png",
        frameRate: 5,
        frameBuffer: 4,
        loop: false,
        autoplay: false,
      });
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectFrom2D();

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      player.position.x = 750;
      player.position.y = 230;
      player.collisionBlocks = collisionBlocks;
      player.preventInput = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel3.png",
      });

      door = new Sprite({
        position: {
          x: 176,
          y: 335,
        },
        imageSrc: "./img/doorOpen.png",
        frameRate: 5,
        frameBuffer: 4,
        loop: false,
        autoplay: false,
      });
    },
  },
};

const keys = {
  z: {
    pressed: false,
  },
  q: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  door.draw();

  // collisionBlocks.forEach((block) => block.draw());

  player.velocity.x = 0;

  player.handleInput(keys);

  player.draw();
  player.update();

  ctx.save();

  ctx.globalAlpha = overlay.opacity;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.restore();
}

levels[level].init();

animate();
