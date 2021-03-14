/**
 *  Init Variable 
 */

const canvas = document.getElementById('canvas');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
const ctx  = canvas.getContext('2d');
const particle = [];
const number = 100 ;
const color_array = ['#F24141', '#F2B035' , '#166B8C'];
const max_dx = 10 ;
const max_dy = 10 ;
const max_radius= 30 , min_radius =10;

/**
 *  Create a Class of Circle
 */

class Circle {
    constructor(x ,y ,dx , dy ,color , radius, ctx){
        this.x = x ;
        this.y = y ;
        this.dx = dx ;
        this.dy = dy ;
        this.color = color;
        this.radius = radius;
        this.ctx = ctx ;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius, 0 ,Math.PI * 2);
        ctx.fill();
    }
    update(){
        if(this.x+this.dx >= window.innerWidth || this.x + this.dx <= 0){
            this.dx = - this.dx;
        }
        if(this.y+this.dy >= window.innerHeight || this.y + this.dy <= 0){
            this.dy = - this.dy;
        }
        this.x  += this.dx ;
        this.y  += this.dy ;
        this.draw();
    }
}

/**
 *  Set up Scene
 */

 for(let i=0;i < number; ++i){
     let x = Math.random()*window.innerWidth ;
     let y = Math.random()*window.innerHeight; 
     let dx = Math.random()* max_dx ; 
     let dy = Math.random()* max_dy ;
     let radius = Math.random()* (max_radius-min_radius) + min_radius;
     let color = color_array[Math.floor(Math.random()*3)];
     particle.push(new Circle( x ,y ,dx ,dy ,color, radius, ctx) );
 }


 /**
  *  Animation function and Start it 
  */

  function animation(){
      ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
      for (let i=0 ;i<particle.length;++i){
          particle[i].update();
      }
      requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation)


  /**
   *  Problem : dx and dy start at positive 
   */