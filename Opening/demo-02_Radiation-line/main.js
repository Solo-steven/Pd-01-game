/**
 *  Init Variable
 */

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const line_array = [];
const number = 200 ;
const particleColors = ["#00ACC0", "#F7457F", "#DFE5F1"];
const backgroundRgb = {
  r: 23,
  g: 24,
  b: 29
};


/**
 *  Class Set up 
 */

class Vector {
    constructor(){
        this.x ;
        this.y ;
        this.lenght ;
        this.angle ;
    }
    setPosition(x ,y){
        this.x = x ;
        this.y = y ;  
        this.lenght = Math.sqrt( this.x * this.x + this.y * this.y );
        this.angle = Math.atan(Math.tan(this.x , this.y));
    }
    setLenght(lenght){
        this.lenght = lenght;
        if(this.angle === undefined){
            return ;
        }
          
        this.x = Math.cos(this.angle) * this.lenght;
        this.y = Math.sin(this.angle) * this.lenght;  
    }
    setAngle(angle){
        this.angle = angle;
        if(this.lenght === undefined )
          return;
        this.x = Math.cos(this.angle) * this.lenght;
        this.y = Math.sin(this.angle) * this.lenght;  
    }
    setX(x){
        this.x = x ;
        this.lenght = Math.sqrt( this.x * this.x + this.y * this.y );
        this.angle = Math.atan(Math.tan(this.x , this.y));
    }
    setY(y){
        this.y = y;
        this.lenght = Math.sqrt( this.x * this.x + this.y * this.y );
        this.angle = Math.atan(Math.tan(this.x , this.y));
    }
    add(vector){
        this.setX(this.x + vector.x);
        this.setY(this.y + vector.y);
    }
    getX(){
        return this.x
    }
    getY(){
        return this.y;
    }
}


class Particle{
    constructor(position , velocity, color ,ctx){
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.ctx = ctx ;
        this.radius = 1 ;
    }
    draw(){
        let {x ,y} = this.position;
        this.ctx.beginPath();
        this.ctx.arc(x ,y ,this.radius , 0 , Math.PI*2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    update(){
        let {x ,y} = this.position;
        if(x + this.radius >= window.innerWidth){
            this.position.setX(0 + this.radius);
        }
        else if (x +this.radius <= 0){
            this.position.setX(window.innerWidth - this.radius);
        }
        if(y + this.radius >= window.innerHeight){
            this.position.setY(0 + this.radius);
        }
        else if (y +this.radius <= 0){
            this.position.setY(window.innerHeight - this.radius);
        }
        this.velocity.setX( this.velocity.getX() + (Math.random() > 0.5 ? 0.01 : - 0.01) );
        this.velocity.setY( this.velocity.getY() + (Math.random() > 0.5 ? 0.01 : - 0.01) );
        this.position.add(this.velocity);
        this.draw();
    }
}

/**
 *  Set up Scene
 */

 for(let i=0;i<number; ++i){
     let position = new Vector();
     position.setPosition(Math.random()*window.innerWidth , Math.random()*window.innerHeight);
     let velocity = new Vector();
     velocity.setLenght(1);
     velocity.setAngle( Math.PI * 2 * Math.random() );
     let color = particleColors[Math.floor(Math.random()*3)];
     line_array.push(new Particle(position, velocity , color,ctx))
 }

 /**
  *  Animation
  */

 function animate() {
    ctx.fillStyle = `rgba(${backgroundRgb.r}, ${backgroundRgb.g}, ${backgroundRgb.b}, .01)`;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
     for(let i=0;i<line_array.length; ++i){
        line_array[i].update();
     }
     requestAnimationFrame(animate);
 } 

requestAnimationFrame(animate)
