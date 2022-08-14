class Explosion {
  constructor(x, y, container) {
    this.position = {
      x: x,
      y: y
    }
    this.container = container;
    this.particles = [];
    this.numOfParticles = 20;
    this.maxLife = 10000;
    this.lifeSpan = 200;
    this.exploaded = false;
  }

  init() {
    this.initDust();
  }

  initDust() {
    for (let i = 0; i < this.numOfParticles; i++) {
      const d = new Dust(this.container);
      d.init();
      this.particles.push(d)
    }
  }

  expload(position){
    console.log('explosion expload')
    this.exploaded = true;
    this.lifeSpan = this.maxLife;
    this.particles.forEach((particle)=>{
      particle.fire(position)
    })
  }

  update(){
    if(!this.exploaded) return;
    if(this.lifeSpan <= 0) return;
    
    this.lifeSpan--;
    this.particles.forEach((particle)=>{
      particle.update();
    })
  }
}