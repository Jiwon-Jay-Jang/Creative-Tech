class Particle {

    constructor(_x, _y, colorType){
      this.pos = createVector(_x, _y)
      this.vel = createVector(random(-3, 3), random(-3, 3))
      
      this.radius = random(15, 45)
      
      // Set color based on the given colorType
      if (colorType === 'green') {
        this.partColor = color(120 / 360 * TWO_PI, 0.9, 0.9) // Green color
      } else {
        this.partColor = color(270 / 360 * TWO_PI, 0.9, 0.9) // Purple color
      }
      
      this.friendliness = random(70, 250)
    }
  
    move() {
      this.pos.add(this.vel)
  
      if (this.pos.x - this.radius <= 0 || this.pos.x + this.radius >= width) {
        this.vel.x *= -1
      }
  
      if (this.pos.y - this.radius <= 0 || this.pos.y + this.radius >= height) {
        this.vel.y *= -1
      }
    }
  
    display() {
      fill(this.partColor)
      noStroke()
      circle(this.pos.x, this.pos.y, this.radius * 2)
    }
  }
  