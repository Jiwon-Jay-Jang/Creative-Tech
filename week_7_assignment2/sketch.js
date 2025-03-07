let particles = []

function setup() {
  createCanvas(400, 300)
  colorMode(HSB, TWO_PI, 1, 1)

  // Add 5 particles with the first one being green and the others purple
  particles.push(new Particle(random(width), random(height), 'green'))
  for (let i = 1; i < 5; i++) {
    particles.push(new Particle(random(width), random(height), 'purple'))
  }
}

function draw() {
  background(0)

  // Create a new array to hold particles that shouldn't be removed
  let particlesToKeep = [];

  // Loop through all particles to update them
  particles.forEach((p) => {
    p.move();
    p.display();

    // If the particle is purple and it overlaps with the green particle, remove it
    if (p.partColor.levels[0] === 270 / 360 * TWO_PI) { // Check if the particle is purple
      let greenParticle = particles[0]; // Get the green particle (the first one)
      let d = greenParticle.pos.dist(p.pos); // Calculate the distance between the green and purple particles
      if (d >= greenParticle.radius + p.radius) {
        // If no overlap, keep the purple particle in the array
        particlesToKeep.push(p);
      }
    } else {
      // Keep the green particle in the array
      particlesToKeep.push(p);
    }
  });

  // Update the particles array with the remaining particles
  particles = particlesToKeep;
}


class Particle {
  constructor(_x, _y, _color) {
    this.pos = createVector(_x, _y);
    this.vel = createVector(random(-3, 3), random(-3, 3));
    this.radius = random(15, 45);
    this.partColor = _color || color(map(_x, 0, width, 0, TWO_PI), 0.9, 0.9);
    this.friendliness = random(70, 250);
  }

  move() {
    this.pos.add(this.vel);

    if (this.pos.x - this.radius <= 0 || this.pos.x + this.radius >= width) {
      this.vel.x *= -1;
    }

    if (this.pos.y - this.radius <= 0 || this.pos.y + this.radius >= height) {
      this.vel.y *= -1;
    }
  }

  display() {
    fill(this.partColor);
    noStroke();
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }

  reachOut(_allparticles) {
    _allparticles.forEach((otherP) => {
      if (this.pos !== otherP.pos && this.pos.dist(otherP.pos) <= this.friendliness) {
        stroke(TWO_PI / 2, 1, 1);
        line(this.pos.x, this.pos.y, otherP.pos.x, otherP.pos.y);
      }
    });
  }

  isTouching(otherP) {
    return this.pos.dist(otherP.pos) < this.radius + otherP.radius;
  }
}
