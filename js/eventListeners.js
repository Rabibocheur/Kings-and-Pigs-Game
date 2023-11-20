window.addEventListener("keydown", (e) => {
  if (player.preventInput) return;

  switch (e.key) {
    case "z":
      if (
        player.hitbox.position.x + player.hitbox.width <=
          door.position.x + door.width &&
        player.hitbox.position.x >= door.position.x
      ) {
        player.preventInput = true;
        player.switchSprite("enterDoor");
        door.play();
        return;
      }

      if (player.velocity.y <= 1) player.velocity.y = -20;

      break;
    case "q":
      keys.q.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "q":
      keys.q.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
