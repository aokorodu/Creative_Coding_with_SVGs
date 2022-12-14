class Rocket {
  constructor(x, y, container, svgWidth, svgHeight) {
    this.container = container;
    this.spinner = this.container.querySelector("#rocketSpinner");
    this.flames = this.container.querySelector("#flames");
    this.w = svgWidth;
    this.h = svgHeight;
    this.spinSpeed = 0;
    this.r = 30;

    this.startPosition = {
      x: x,
      y: y
    }

    this.position = {
      x: 0,
      y: 0
    };
    this.velocity = null;
    this.acceleration = null;
    this.angle = 0;
    this.blowedUp = false;

    this.init();
  }

  reset(){
    this.position.x = this.startPosition.x;
    this.position.y = this.startPosition.y;

    this.velocity = {
      x: 0,
      y: 0
    }

    this.acceleration = {
      x: 0,
      y: 0
    }

    this.angle = 0;
    this.blowedUp = false;
    this.flames.setAttribute("opacity", 0);

    this.container.appendChild(this.spinner)

  }

  init(){
    this.reset();
  }

  spin(num) {
    this.spinSpeed = num;
  }

  fire() {
    console.log('fire')
  }

  thrust() {
    const radians = this.getRadians(this.angle)
    const yAccel = Math.sin(radians) / 4;
    const xAccel = Math.cos(radians) / 4;
    this.acceleration.x = xAccel;
    this.acceleration.y = yAccel;
    this.showFlames(true)
  }

  stopThrust(){
    this.showFlames(false);
  }

  showFlames(bool) {
    let op = bool ? 1 : 0;
    this.flames.setAttribute("opacity", op)
  }

  getRadians(angle) {
    return angle * Math.PI / 180
  }

  getFiringData() {
    return {
      x: this.position.x,
      y: this.position.y,
      angle: this.angle
    }
  }

  resetAcceleration() {
    this.acceleration = {
      x: 0,
      y: 0
    }
  }

  update() {
    if (this.blowedUp) return;

    this.angle += this.spinSpeed;

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    this.position.x += this.velocity.x;
    if (this.position.x > this.w) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = this.w;
    }
    this.position.y += this.velocity.y;
    if (this.position.y > this.h) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = this.w;
    }

    this.draw();
    this.resetAcceleration();


  }

  blowUp() {
    this.blowedUp = true;
    this.spinner.remove();
  }

  isBlowedUp() {
    return this.blowedUp;
  }

  draw() {
    this.container.setAttribute("transform", `translate(${this.position.x} ${this.position.y})`);
    this.spinner.setAttribute("transform", `rotate(${this.angle})`)
  }
}