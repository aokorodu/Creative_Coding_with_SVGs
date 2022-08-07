class Rocket {
  constructor(x, y, container, svgWidth, svgHeight) {
    this.container = container;
    this.spinner = this.container.querySelector("#rocketSpinner");
    this.w = svgWidth;
    this.h = svgHeight;
    this.spinSpeed = 0;

    this.position = {
      x: x,
      y: y
    }

    this.velocity = {
      x: 0,
      y: 0
    }

    this.acceleration = {
      x: 0,
      y: 0
    }

    this.angle = 0;
  }

  spin(num) {
    this.spinSpeed = num;
    console.log('angle: ', this.angle)
  }

  fire() {
    console.log('fire')
  }

  thrust() {
    console.log('thrust');
    const radians = this.getRadians(this.angle)
    const yAccel = Math.sin(radians)/5;
    const xAccel = Math.cos(radians)/5;
     this.acceleration.x = xAccel;
     this.acceleration.y = yAccel;
  }

  getRadians(angle){
    return angle * Math.PI/180
  }

  getFiringData(){
    return {
      x: this.position.x,
      y: this.position.y,
      angle: this.angle
    }
  }

  resetAcceleration(){
    this.acceleration = {
      x: 0,
      y: 0
    }
  }

  update() {
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

  draw(){
    this.container.setAttribute("transform", `translate(${this.position.x} ${this.position.y})`);
    this.spinner.setAttribute("transform", `rotate(${this.angle})`)
  }
}