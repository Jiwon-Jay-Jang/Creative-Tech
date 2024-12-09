let bkgndClr
let radius
let angle = 0;
let interval = 2000;
let noiseScale = 0.01
let noiseOffset = 0;
let startMoving = false;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, TWO_PI, 1, 1)
  radius = width*0.1;
  bkgndClr = color(random(TWO_PI), 1, 1)
}

function draw() {
  if (frameCount % 120 === 0) {
    bkgndClr = color(random(TWO_PI), 1, 1);
  }
    background(bkgndClr);
  
  let x = width/2 + 50 *sin(frameCount * 0.05);
  let y = height/2;
  
  noStroke()
  fill('white')
  circle(x, y, radius)
  
  let a = 100 * cos(angle);
  let b = 100 * sin(angle);

  translate(width/2, height/2);
  rectMode(CENTER);
  fill('yellow');
  rect(a, b, 20, 20);
  
  if (millis() > interval) {
    startMoving = true;
  }

  if (startMoving) {
    angle += noise(noiseOffset) * 0.01;
    noiseOffset += noiseScale;
  }
}
