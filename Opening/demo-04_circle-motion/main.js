const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height =window.innerHeight;
const ctx = canvas.getContext('2d');



/**
 *   Test class 
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

const center = new Vector();
center.setPosition(window.innerWidth/2,  window.innerHeight/2);

 class Test{
     constructor(position, velocity , accleration){
         this.position = position;
         this.velocity = velocity;
         this.accleration =accleration;
         this.radius =10;
     }
     draw(){
         ctx.beginPath();
         ctx.fillStyle = "rgb(255,165,0)";
         ctx.arc(this.position.getX(), this.position.getY(), this.radius, 0 , Math.PI*2);
         ctx.fill();
     }
     update(){
         this.position.add(this.velocity);
         this.velocity.add(this.accleration);
         this.accleration = Vector.subtractNew(center , this.position);
         this.accleration.setLenght(1);
         this.draw();
         console.log(this);
     }
 }


 let position = new Vector();
 position.setPosition(500, 200 );
 let velocity = new Vector();
 velocity.setPosition(1,0);
 console.log(center, position);
 let accleration = Vector.subtractNew(center, position);
 accleration.setLenght(1);
 const circle = new Test(position, velocity , accleration);


 const animation = () =>{
         ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
         circle.update();
         requestAnimationFrame(animation);
 }
//console.log(circle);
setInterval(()=>{
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    circle.update();
}, 1200)

 //requestAnimationFrame(animation);