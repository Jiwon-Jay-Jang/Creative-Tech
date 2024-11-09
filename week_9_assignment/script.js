let video;
let classifier;
let emoji = "🤓";

let _isDrawing = false;

let handPose;
let hands = [];
let indexPosX = 0,
  indexPosY = 0;
let thumbPosX = 0;
thumbPosY = 0;

function preload() {
  handPose = ml5.handPose();
  classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/hkRUrdNBv/"
  );
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

function gotResults(results) {
  if (_isDrawing) {
    return;
  }else{
    console.log ('detecting')
  }
  console.log (results)
  switch (results[0].label) {
    case "NoObject":
      classifyVideo();
      break;
    case "Coffee":
      emoji = "☕️";
      _isDrawing = true;
      break;
    case "Water":
      emoji = "🍺";
      _isDrawing = true;
      break;
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  classifyVideo();
  handPose.detectStart(video, gotHands);
}

function draw() {
  console.log(emoji)
  //background(255);
  //image(video, 0, 0, width, height);
  if (_isDrawing) {
    if (hands.length > 0) {
      let hand = hands[0];
      //console.log(hand);

      let index_tip = hand.index_finger_tip;
      let thumb_tip = hand.thumb_tip;

      (indexPosX = width - index_tip.x), (indexPosY = index_tip.y);
      thumbPosX = width - thumb_tip.x;
      thumbPosY = thumb_tip.y;

      fill(0, 255, 0);
      circle(indexPosX, indexPosY, 3);

      fill(255, 0, 0);
      circle(thumbPosX, thumbPosY, 3);

      let d = dist(index_tip.x, index_tip.y, thumb_tip.x, thumb_tip.y);

      if (d <= 30) {
        drawEmoji();
      }
    }
  }
}

function drawEmoji() {
  let emojiSize = 72;
  textSize(emojiSize);
  fill(255);

  text(emoji, indexPosX - emojiSize / 2, indexPosY + emojiSize / 2);

  console.log("emoji is drawed");

  _isDrawing = false;
  emoji = ' '
  classifyVideo();
}
