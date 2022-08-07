class Torpedo {
  constructor(x, y, container, defID, svgWidth, svgHeight) {
    const namespace = "http://www.w3.org/2000/svg"
    this.container = container;
    this.graphic = null;
    this.defID = defID;
    this.w = svgWidth;
    this.h = svgHeight;
    this.r = 5;
    this.max = this.w + 2*this.r;
    this.min = -2*this.r;
    this.position = {
      x: x,
      y: y
    }

    this.directionAngle =0;
    this.speed = 4;
    this.velocity = {
      x: 0,
      y: 0
    }

    this.angle = 0;
    this.fired = false;
  }

  isReady(){
    console.log('is ready? ', !this.fired)
    return !this.fired;
  }

  isFired(){
    return this.fired;
  }

  init(){
    this.graphic = document.createElementNS(namespace, "use");
    this.graphic.setAttribute("href", `#${this.defID}`)
    this.graphic.setAttribute("x", this.position.x);
    this.graphic.setAttribute("y", this.position.y);
    
  }

  fire(x, y, angle){
    
    this.fired = true;
    this.container.appendChild(this.graphic);
    this.directionAngle = angle * Math.PI/180;
    this.velocity = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    }
    this.position = {
      x: x,
      y: y
    }
  }

  

  update() {
    if(!this.fired) return;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if ((this.position.x > this.max) || (this.position.x < this.min) || (this.position.y > this.max) || (this.position.y < this.min)) {
      this.blowUp();
      
      return;
    } 
   
    this.draw();
  }

  draw(){
    this.graphic.setAttribute("x", this.position.x);
    this.graphic.setAttribute("y", this.position.y);
  }

  blowUp(){
    this.graphic.remove();
    this.fired = false;
  }


}