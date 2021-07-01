/// <reference path="../TSDef/p5.global-mode.d.ts" />
"use strict";

let w, h;

let lenSlider;
let stepSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  angleMode(DEGREES)

  lenSlider = createSlider(1, 40, 1, 1);
  lenSlider.position(10, 10)

  stepSlider = createSlider(40, 100, 40, 1);
  stepSlider.position(10, 30)

}

function draw() {

  let linelen = lenSlider.value();
  let pointsstep = stepSlider.value();

  noFill()
  stroke(255)

  background(0)

  translate(w / 2, h / 2);

  for (let x = -w / 2; x <= w / 2; x += pointsstep) {
    for (let y = -h / 2; y <= h / 2; y += pointsstep) {
      let p = createVector(x, y)
      let m = createVector(mouseX - w / 2, mouseY - h / 2);
      let dist = p.dist(m);
      let dir = p5.Vector.sub(p, m).normalize().mult(dist > linelen ? linelen : dist)

      stroke(255, 0, 0)
      ellipse(m.x, m.y, 5)
      stroke(255)

      strokeWeight(5)
      point(p.x + dir.x, p.y + dir.y)
      strokeWeight(1)
      line(p.x, p.y, p.x + dir.x, p.y + dir.y)
    }
  }
}
