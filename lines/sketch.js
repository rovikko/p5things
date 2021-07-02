/// <reference path="../TSDef/p5.global-mode.d.ts" />
"use strict";

let w, h;

let lenSlider;
let stepSlider;
let pointsizeSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  angleMode(DEGREES)

  stepSlider = createSlider(40, 100, 40, 1);
  stepSlider.position(10, 10)

  lenSlider = createSlider(1, 70, 1, 1);
  lenSlider.position(10, 30)

  pointsizeSlider = createSlider(1, 15, 1, 1);
  pointsizeSlider.position(10, 50)

}

function draw() {

  background(0,70)

  let linelen = lenSlider.value();
  let ptpdist = stepSlider.value();
  let pointsize = pointsizeSlider.value();

  noFill()
  stroke(255)

  push()
  translate(w / 2, h / 2);

  let x = 0;
  let i = 0;
  while (x <= w / 2 && x >= -w / 2) {

    x += i * ptpdist * (i % 2 == 0 ? 1 : -1)

    let y = 0;
    let j = 0;
    while (y <= h / 2 && y >= -h / 2) {

      y += j * ptpdist * (j % 2 == 0 ? 1 : -1)

      let p = createVector(x, y)
      let m = createVector(mouseX - w / 2, mouseY - h / 2);
      let dist = p.dist(m);
      let dir = p5.Vector.sub(p, m)
        .normalize()
        .mult(min(dist, linelen))
        .rotate(random(-dist / 400, dist / 400))

      line(p.x, p.y, p.x + dir.x, p.y + dir.y)
      strokeWeight(pointsize)
      point(p.x + dir.x, p.y + dir.y)
      strokeWeight(1)

      j++;
    }

    i++;
  }

  pop()
  noStroke()
  fill(0, 0, 0, 200)
  rect(0, 0, 280, 75)
  fill(255)
  text('point-to-point distance', 150, 20)
  text('lines max length', 150, 40)
  text('point size', 150, 60)
}
