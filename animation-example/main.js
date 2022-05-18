// canvas setup
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // This is our rendering mode, which will almost always be "2d"

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  // These property declarations are optional in JS, but aid in readability
  x;
  y;
  velX;
  velY;
  color;
  size;

  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    /*Since variable ctx was not declared inside its own scope (anything in curly braces {}), it is accessible ANYWHERE
    (even other .js files)...*/
    ctx.beginPath(); // Essentially, this declares that we intend to start drawing
    ctx.fillStyle = this.color; // Color we will be drawing in (and filling the shape with)
    /*X and Y state where the arc will be drawn on the page, size dictates the radius
    The second to last argument is the position, in degrees, to start drawing the arc
    The last argument is the length, in radians, that will be drawn (2pi = 360 degrees = circumference of a circle*/
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill(); // This indicates that we should draw the path specified by the arc and fill it with the color we specified
  }

  // This function covers the actual movement of the ball
  // Again, this function is entangled with the global variable width, which I don't really like...
  update() {
    /*This method and the three that succeed it are for collision detection, and work by calculating if the
    ball has left the canvas area in both the x(width) and y(height) direction
    If collsion is detected, the velocity is reversed, to created a "bouncing off" effect
    Keep in mind that the x/y coords map to the middle of the ball, which is why we must take the radius (size) into account*/
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // This method acts as ball-ball collision detection
  collisionDetect() {
    for (const ball of balls) {
      /*Essentially, this asks if the current ball in the loop ("ball") is the same as the object that this
      copy of the method is being called on ("this")
      This is because we do not want to measure collision between a ball and itself, for obvious reasons
      WE are checking each active ball against the current ball ("this")*/
      if (!(this === ball)) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy); // This is the distance between the two ball's centers
 
          if (distance < this.size + ball.size) {
            ball.color = this.color = randomRGB();
          }
       }
    }
 }
}

/*This section of code handles creating 25 balls*/
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  // Remember, the push method adds a new member to the end of an array
  balls.push(ball);
}

/*Animations are almost always done using some sort of loop, which updates the animated members at each iteration*/
function loop() {
  /*Recall that ctx is our drawing area, so here we are setting the background to a semitransparent black with fillStyle
  then filling in the rectangle (our drawing area) with this color using fillRect (first two args are the starting coords)
  This rectangle must be drawn at each iteration to cover up previously drawn balls, and is semitransparent to create a slight
  trail effect (transparency is set by the last argument, where 0 is fully transparent and 1 is fully opaque*/
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  /*Draws and updates each ball*/
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  /*Built in method which recursively calls the loop function to animate our balls*/
  requestAnimationFrame(loop);
}

// Begins the animation:
loop();
