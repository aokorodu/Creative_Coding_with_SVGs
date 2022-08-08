class LittleRock {
  constructor(x, y, container, defID, svgWidth, svgHeight) {
    const namespace = "http://www.w3.org/2000/svg"
    this.container = container;
    this.graphic = null;
    this.defID = defID;
    this.w = svgWidth;
    this.h = svgHeight;
    this.r = 5;
    this.max = this.w + 2 * this.r;
    this.min = -2 * this.r;
    this.position = {
      x: x,
      y: y
    }

    this.directionAngle = Math.random() * 2 * Math.PI;
    this.speed = .6 + Math.random() * 1.5;
    this.velocity = {
      x: Math.sin(this.directionAngle) * this.speed,
      y: Math.cos(this.directionAngle) * this.speed
    }

    this.blowedUp = false;
    this.fired = false;
  }

  init() {
    this.graphic = document.createElementNS(namespace, "use");
    this.graphic.setAttribute("href", `#${this.defID}`)
    this.graphic.setAttribute("x", this.position.x);
    this.graphic.setAttribute("y", this.position.y);

  }

  fire(position) {
    if (position) {
      this.position.x = position.x;
      this.position.y = position.y;
    }
    this.fired = true;
    this.blowedUp = false;
    this.container.appendChild(this.graphic);
  }



  update() {
    if (this.blowedUp) return;
    if(!this.fired) return;

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
    this.graphic.setAttribute("x", this.position.x);
    this.graphic.setAttribute("y", this.position.y);
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

  isAvailable() {
    if(!this.fired) return true;

    return false;
  }


}