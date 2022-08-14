class Dust {
  constructor(container) {
    const namespace = "http://www.w3.org/2000/svg"
    this.container = container;
    this.graphic = null;
    this.r = 2 + Math.round(Math.random() * 2);
   
    this.position = {
      x: 0,
      y: 0
    };
    this.directionAngle = null;
    this.speed  = null;
    this.velocity = null;
    this.lifespan = 100;
    this.fired = false;
  }

  reset(){
    if(this.graphic) this.graphic.remove();
    this.position = {
      x: 0,
      y: 0
    };

    this.directionAngle = Math.random() * 2 * Math.PI;
    this.speed = .6 + Math.random() * 1.5;
    this.velocity = {
      x: Math.sin(this.directionAngle) * this.speed,
      y: Math.cos(this.directionAngle) * this.speed
    }

    this.lifespan = 100;
    this.fired = false;
  }

  init() {
    this.reset();
    this.build();
  }

  build(){
    
    this.graphic = document.createElementNS(namespace, "circle");
    this.graphic.setAttribute("r", this.r);
    this.graphic.setAttribute("cx", 0);
    this.graphic.setAttribute("cy", 0);
    this.graphic.setAttribute("fill", "white");
    this.graphic.setAttribute("transform", `translate(${this.position.x} ${this.position.y})`);
    
  }

  fire(position) {
    this.fired = true;
    if (position) {
      this.position.x = position.x;
      this.position.y = position.y;
    }
    this.graphic.setAttribute("opacity", 1);
    this.container.appendChild(this.graphic);
    this.draw();
    
  }

  destroy(){
    this.graphic.remove();
  }



  update() {
    if(!this.fired) return;
    if (this.lifespan== 0) return;

    console.log('update')
    
    this.position.x += this.velocity.x;   
    this.position.y += this.velocity.y;
    this.draw();
    this.lifespan--;
    if(this.lifespan == 0) this.reset();
  }

  draw() {
    this.graphic.setAttribute("transform", `translate(${this.position.x} ${this.position.y})`);
    this.graphic.setAttribute("opacity", this.lifespan/100);
  }
}