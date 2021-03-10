
/**
 *  Class 
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
    getX(){
        return this.x
    }
    getY(){
        return this.y;
    }
    getValue(){
        return  Math.sqrt(this.x*this.x + this.y * this.y )
    }
    add(vector){
        this.setX(this.x + vector.x);
        this.setY(this.y + vector.y);
    }
    subtract(vector){
        this.setX(this.x - vector.x);
        this.setY(this.y - vector.y);
    }
    subtractNew(vector){
        let new_vector = new Vector();
        new_vector.setX(this.getX() - vector.getX());
        new_vector.setY(this.getY() - vector.getY());
        return new_vector;
    }
    multiplyConstant(constant){
        this.setX(this.getX()*constant);
        this.setY(this.getY()*constant);
    }

}


 class Particle{
     constructor(destination , ww, wh,color ,ctx){
        this.destination =destination;
        this.color = color;
        this.ctx =ctx;
        this.position = new Vector();
        this.position.setPosition(Math.random()*ww, Math.random()*wh);
        this.velocity = new Vector();
        this.velocity.setLenght(10);
        this.velocity.setAngle(Math.PI * 2 * Math.random());
        this.acceleration = new Vector();
        this.acceleration.setPosition(0,0)
        this.radius = 5* Math.random() +5;
        this.fraction = Math.random()*0.029 +0.95;

     }
     draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.position.getX(), this.position.getY(),this.radius,0 , Math.PI*2);
        this.ctx.fill();
     }
     update(){
        this.acceleration = this.destination.subtractNew(this.position);
        this.acceleration.multiplyConstant(1/1000);
        this.velocity.add(this.acceleration);
        this.velocity.multiplyConstant(this.fraction);
        this.position.add(this.velocity);
        this.draw();
     }
 }


class TextAnimation{
    constructor(canvas , ctx , text , colors){
        this.canvas = canvas;
        this.ww = canvas.width;
        this.wh = canvas.height; 
        this.ctx = ctx ;
        this.text = text;
        this.text_Particle =[];
        this.colors =colors;
        this.animate = this.animate.bind(this);
    }
    init(){
        this.ctx.font = "bold "+ (this.ww/6)+"px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText( this.text, this.ww/2, this.wh/2);
        let data  = this.ctx.getImageData(0, 0, this.ww, this.wh).data;
        this.ctx.clearRect(0, 0, this.ww, this.wh);
        for(let i=0; i< this.ww ; i+= Math.round(this.ww/150)){
            for(let j=0 ; j <this.wh ;j+=Math.round(this.wh/150)){
                if(data[ ((i + j*this.ww)*4) + 3] > 150){
                    let destination = new Vector();
                    destination.setPosition(i , j)
                    let color = this.colors[Math.floor(Math.random()* (this.colors.length))];
                    this.text_Particle.push(new Particle(destination, this.ww, this.wh, color ,  this.ctx))
                }
            }
        }
        console.log(this.text_Particle, this.colors)
    }
    animate(){
        this.ctx.clearRect(0, 0 ,this.ww, this.wh);
        for(let i=0;i<this.text_Particle.length;++i){
            this.text_Particle[i].update();
        }
        requestAnimationFrame(this.animate);
    }
    end(){
        let counter =0;
        for(let i=0;i<this.text_Particle.length;++i){
            if(this.text_Particle[i].velocity.getValue() <1){
                counter ++;
            }   
        }
        if(counter == this.text_Particle.length)
            return true;
        return false;    
    }
}

/**
 *  Init Variable
 */
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const colors=['#50A0BF', '#337AA6', '#144673'];

let animate = new TextAnimation(canvas, ctx ,'IMSLab',  colors);
animate.init();
setTimeout( ()=>{requestAnimationFrame(animate.animate)}, 2000);