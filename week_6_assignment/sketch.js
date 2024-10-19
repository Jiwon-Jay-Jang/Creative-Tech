let angle = 0;
let lastMoveTime = 0;
let interval = 2000; // 2초 후 움직이기 시작
let shapeX, shapeY;
let noiseOffset = 0;
let movingShapeStart = false;

function setup() {
  createCanvas(800, 600);
  shapeX = width / 2;
  shapeY = height / 2;
}

function draw() {
  background(220);

  // 첫 번째 도형: 반복적인 움직임 (진자 운동)
  let pendulumX = width / 2 + 200 * sin(angle);
  let pendulumY = height / 2;
  fill(100, 150, 250);
  ellipse(pendulumX, pendulumY, 50, 50);

  // 각도를 증가시켜서 반복적인 진자 운동을 만듦
  angle += 0.05;

  // 두 번째 도형: 일정 시간 후 움직임
  if (millis() - lastMoveTime > interval) {
    movingShapeStart = true;
  }

  if (movingShapeStart) {
    // Perlin noise를 사용하여 유기적인 움직임 추가
    let noiseValue = noise(noiseOffset) * 100;
    shapeX = width / 2 + noiseValue * cos(angle);
    shapeY = height / 2 + noiseValue * sin(angle);

    noiseOffset += 0.01;
  }

  fill(250, 100, 150);
  ellipse(shapeX, shapeY, 70, 70);
}
