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
    getX(){
        return this.x
    }
    getY(){
        return this.y;
    }
    getValue(){
        return this.x * this.x + this.y * this.y;
    }
    add(vector){
        this.setX(this.x + vector.x);
        this.setY(this.y + vector.y);
    }
    subtract(vector){
        this.setX(this.x - vector.x);
        this.setY(this.y - vector.y);
    }
    multiplyConstant(constant){
        this.setX(this.getX()*constant);
        this.setY(this.getY()*constant);
    }

    static subtractNew(vector1 ,vector2){
        let new_vector = new Vector();
        new_vector.setX(vector1.getX() - vector2.getX());
        new_vector.setY(vector1.getY() - vector2.getY());
        return new_vector;
    }

}

const colors=['#5C73F2', '#0029FA', '#230A59'];

class Crystal{
   constructor(position, velocity, color,ctx ){
       this.position = position;
       this.velocity =velocity;
       this.color = color;
       this.radius = 1 + Math.random()*0.5;
       this.ctx =ctx;
   }
   draw(){
     this.ctx.beginPath();
     this.ctx.arc(this.position.getX(), this.position.getY(),this.radius, 0 ,Math.PI*2);
     this.ctx.fillStyle = colors[Math.floor(Math.random()*3)];
     this.ctx.fill();
   }
   update(){
        let x =this.position.getX() , y=this.position.getY();
        let dx = this.velocity.getX() , dy=this.velocity.getY();
        if(x+dx >= window.innerWidth || x+dx <= 0){
            this.velocity.setX( - this.velocity.getX());
        }
        if(y+dy >= window.innerHeight || y+dy <=0){
            this.velocity.setY(-this.velocity.getY());
        }
        this.position.add(this.velocity)
        this.draw();
   }
}

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
const ctx = canvas.getContext('2d');
const number =200; 
const particle =[];

for (let i=0;i<number;++i){
    let position = new Vector();
    position.setPosition(window.innerWidth*Math.random() , window.innerHeight * Math.random());
    let velocity = new Vector();
    velocity.setAngle(Math.random()* Math.PI * 2);
    velocity.setLenght(3);
    //console.log(velocity)
    let color =colors[Math.floor(Math.random()*3)];
    particle.push(new Crystal(position , velocity , color,ctx));
}


function connect(particle){
    for(let i=0; i< number ;++i){
        for(let j=0;j<number;++j){
            if(i!=j){
                let distance = Vector.subtractNew(particle[i].position , particle[j].position);
                if(distance.getValue()<15000){
                    ctx.beginPath();
                    ctx.moveTo(particle[i].position.getX() , particle[i].position.getY());
                    ctx.lineTo(particle[j].position.getX() , particle[j].position.getY());
                    ctx.strokeStyle = colors[Math.floor(Math.random()*3)];
                    //console.log(ctx.strokeStyle)
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
}

function animate(){
    ctx.clearRect(0, 0 ,window.innerWidth, window.innerHeight);
    for(let i=0;i<number;++i){
        particle[i].update();
    }
    connect(particle);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);