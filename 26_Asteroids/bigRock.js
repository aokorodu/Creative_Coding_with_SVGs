class BigRock {
  constructor(x, y, container, svgWidth, svgHeight) {
    const namespace = "http://www.w3.org/2000/svg"
    this.container = container;
    this.graphic = null;
    this.w = svgWidth;
    this.h = svgHeight;
    this.r = 50;
    this.max = this.w + 2 * this.r;
    this.min = -2 * this.r;
    this.startPosition = {
      x: x,
      y: y
    }
    this.position = {
      x: 0,
      y: 0
    };
    this.directionAngle = null;
    this.speed = null;
    this.velocity = null;
    this.blowedUp = false;
    this.fired = false;
  }

  init() {
    this.reset();
    this.build();
  }

  reset(){
    this.position.x = this.startPosition.x;
    this.position.y = this.startPosition.y;
    this.directionAngle = Math.random() * 2 * Math.PI;
    this.speed =  .3 + Math.random() * .7;
    this.velocity = {
      x: Math.sin(this.directionAngle) * this.speed,
      y: Math.cos(this.directionAngle) * this.speed
    }
    this.blowedUp = false;
    this.fired = false;

    
  }

  build(){
    const totalPoints = 8 + Math.round(Math.random() * 8);
    const angleIncrement = (Math.PI * 2) / totalPoints;
    const ptArray = [];
    for (let i = 0; i < totalPoints; i++) {
      const currentAngle = i * angleIncrement;
      const radius = 2 * this.r/3 + (Math.random() * 1 * this.r/ 3);
      const x = Math.cos(currentAngle) * radius;
      const y = Math.sin(currentAngle) * radius;
      ptArray.push(`${x} ${y}`);
    }

    this.graphic = document.createElementNS(namespace, "polygon");
    this.graphic.setAttribute("points", ptArray.toLocaleString());
    this.graphic.setAttribute("stroke", "white");
    this.graphic.setAttribute("transform", `translate(${this.position.x} ${this.position.y})`);

  }

  fire(position) {
    if (position) {
      this.position.x = position.x;
      this.position.y = position.y;
    }
    this.fired = true;
    this.container.appendChild(this.graphic);
  }



  update() {
    if (this.blowedUp) return;

    this.position.x += this.velocity.x;
    if (this.position.x > this.max) {
      this.position.x = this.min;
    } else if (this.position.x < this.min) {
      this.position.x = this.max;
    }
    this.position.y += this.velocity.y;
    if (this.position.y > this.max) {
      this.position.y = this.min;
    } else if (this.position.y < this.min) {
      this.position.y = this.max;
    }

    this.draw();
  }

  draw() {
    this.graphic.setAttribute("transform", `translate(${this.position.x} ${this.position.y})`);
  }

  blowUp() {
    this.blowedUp = true;
    this.fired = false;
    this.graphic.remove();
  }

  isBlowedUp() {
    return this.blowedUp;
  }

  isFired() {
    return this.fired;
  }


}