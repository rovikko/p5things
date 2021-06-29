/// <reference path="../TSDef/p5.global-mode.d.ts" />
"use strict";

let circles = [];
let w, h;

let speedSlider;
let circleSpeed;
let cCountSlider;


function setup() {
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  ellipseMode(RADIUS);
  angleMode(DEGREES)

  speedSlider = createSlider(10, 800, 10, 10);
  speedSlider.position(10, 10)
  cCountSlider = createSlider(10, 500, 10, 10);
  cCountSlider.position(10, 50)

  addrange(cCountSlider.value(), 500 / cCountSlider.value());
}

function movingcirlce(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.direction = createVector(random(-1, 1), random(-1, 1));
  this.direction.normalize();

  this.move = () => {
    let fps = frameRate();
    fps = fps > 0 ? fps : 60;
    this.x += this.direction.x * circleSpeed / fps;
    this.y += this.direction.y * circleSpeed / fps;

    // border collisions
    // right border
    if (this.x + this.r > w / 2) {
      this.x = w / 2 - this.r
      this.direction.rotate((this.direction.angleBetween(createVector(0, 1))) * 2);
      this.direction.rotate(random(0, 10));
    }
    // left border
    else if (this.x - this.r < -w / 2) {
      this.x = -w / 2 + this.r
      this.direction.rotate((this.direction.angleBetween(createVector(0, -1))) * 2);
      this.direction.rotate(random(0, 10));
    }
    // bottom border
    else if (this.y + this.r > h / 2) {
      this.y = h / 2 - this.r
      this.direction.rotate((this.direction.angleBetween(createVector(1, 0))) * 2);
      this.direction.rotate(random(0, 10));
    }
    // top border
    else if (this.y - this.r < -h / 2) {
      this.y = -h / 2 + this.r
      this.direction.rotate((this.direction.angleBetween(createVector(-1, 0))) * 2);
      this.direction.rotate(random(0, 10));
    }

  }

  this.addradius = (r) => {
    this.r += r / 2;
  }

  this.draw = () => {
    fill(this.r)
    ellipse(this.x, this.y, this.r);
    noFill()
  }
}

function collisions() {

  for (let i = 0; i < circles.length; i++) {
    const ci = circles[i];
    for (let j = i + 1; j < circles.length; j++) {
      const cj = circles[j];

      const d = p5.Vector.dist(createVector(ci.x, ci.y), createVector(cj.x, cj.y))

      if (d < ci.r + cj.r) {

        let delta
        if (d < ci.r || d < cj.r) {
          delta = ci.r > cj.r ? cj.r : ci.r;
        }
        else {
          delta = ci.r + cj.r - d;
        }

        if (ci.r > cj.r) {
          cj.r -= delta * 2;
          if (cj.r <= 0) {
            circles.splice(j, 1);
          }
          ci.addradius(delta)
        }

        else {
          ci.r -= delta * 2;
          if (ci.r <= 0) {
            circles.splice(i, 1)
          }
          cj.addradius(delta)
        }

      }
    }
  }
}

function addrange(range, radius) {
  for (let i = 0; i < range; i++) {
    const x = random(-w / 2 + radius, w / 2 - radius)
    const y = random(-h / 2 + radius, h / 2 - radius)
    circles.push(new movingcirlce(x, y, radius))
  }
}

function restart(range, radius) {
  circles.splice(0, circles.length)
  addrange(range, radius)
}

function draw() {

  noStroke()
  fill(255)
  textSize(15);
  text('speed', 150, 20);
  text('space - respawn', 150, 40);
  text('circle count', 150, 60);

  noFill()
  stroke(255)

  circleSpeed = speedSlider.value();
  background(0, 95)
  translate(windowWidth / 2, windowHeight / 2);

  for (const c of circles) {
    c.draw();
    if (circles.length > 1) {
      c.move();
    }
  }

  collisions()
}

function keyPressed() {
  console.log(keyCode)
  if (keyCode == 32) {
    restart(cCountSlider.value(), 500 / cCountSlider.value())
  }
}