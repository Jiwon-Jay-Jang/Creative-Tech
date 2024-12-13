let bgImage;
let video;
let handPose;
let hands = [];
let indexPosX;
let indexPosY;
let thumbPosX; 
let thumbPosY;

let leftHandImage;
let rightHandImage;
let emojis = [];
let emojiDisplayed = false;

function preload(){
  handPose = ml5.handPose();
  bgImage = loadImage("Frame1.jpg");
  leftHandImage = loadImage("snowman.png")
  rightHandImage = loadImage("star.png")
}

function setup(){
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide()
  handPose.detectStart(video, gotHands);
}

function draw(){
  background(255);
  image(bgImage, 0, 0, width, height)
  //image(video, 0, 0, width, height);
  
  
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    //console.log(hand);
    
    let index_tip = hand.index_finger_tip;
    let thumb_tip = hand.thumb_tip;
    
    indexPosX = width - index_tip.x;
    indexPosY = index_tip.y;
    thumbPosX = width - thumb_tip.x;
    thumbPosY = thumb_tip.y;
    
    fill(0,255,0);
    circle(indexPosX, indexPosY, 5);
    
    fill(0,0,255);
    circle(thumbPosX, thumbPosY, 5);
    
    let d = dist(index_tip.x, index_tip.y, thumb_tip.x, thumb_tip.y);
    
    if (d <= 20 && !emojiDisplayed) {
      if (thumb_tip.x < index_tip.x) {
        emojis.push({ x: indexPosX, y: indexPosY, image: leftHandImage });
        
      } else {
        emojis.push({ x: indexPosX, y: indexPosY, image: rightHandImage });
      }
      emojiDisplayed = true; 
    }
    
    if (d > 20) {
      emojiDisplayed = false;
    }
    }
  for (let i = 0; i < emojis.length; i++) {
    drawImage(emojis[i].x, emojis[i].y, emojis[i].image);
  }
}

function drawImage(x, y, img) {
  imageMode(CENTER);
  image(img, x, y, 50, 50);
}
   
function gotHands(results) {
  hands = results;
}
