/// <reference path="../TSDef/p5.global-mode.d.ts" />
"use strict";

let depthSlider;
let degreeSlider;
let minstepSlider;

let minstep = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  angleMode(DEGREES)
  depthSlider = createSlider(1, 10, 5)
  degreeSlider = createSlider(0, 360, 0, 1);
  minstepSlider = createSlider(1, 20, 10, 0.5);
  depthSlider.position(0, 0)
  degreeSlider.position(0, 20)
  minstepSlider.position(0, 40)
}

function tree(curdepth, maxdepth, deg) {
  if (curdepth == maxdepth) {
    return
  }
  else {
    const xshift = pow(2, (maxdepth - curdepth - 1)) * minstep / 2;
    const yshift = minstep * 0;

    push()
    line(0, 0, xshift, yshift)
    translate(xshift, yshift)
    rotate(deg)
    tree(curdepth + 1, maxdepth, deg);
    pop()

    push()
    line(0, 0, -xshift, yshift)
    translate(-xshift, yshift)
    rotate(-deg)
    tree(curdepth + 1, maxdepth, deg);
    pop()
  }
}

function draw() {

  let depth = depthSlider.value();
  let degree = degreeSlider.value();
  minstep = minstepSlider.value();

  textSize(15);
  noStroke()
  fill(255);
  text('tree depth', 150, 10);
  text('node rotation', 150, 30);
  text('min leaf step', 150, 50);
  stroke(255)


  background(0, 50)
  translate(windowWidth / 2, windowHeight / 2);
  tree(0, depth, degree);

}