/**
 *  Init Variable
 */
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx  = canvas.getContext('2d');

const particle =[];
const number = 100;
const color_array = ['#F24141', '#F2B035' , '#166B8C'];
const max_radius = 30 , min_radius=10;

/**
 *   Create class of Vector and Circle
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
      }
      setLenght(lenght){
          this.lenght = lenght;
          if(this.angle == undefined)
            return ;
          this.x = Math.sin(this.angle) * this.lenght;
          this.y = Math.cos(this.angle) * this.lenght;  
      }
      setAngle(angle){
          this.angle = angle;
          if(this.lenght === undefined )
            return;
          this.x = Math.sin(this.angle) * this.lenght;
          this.y = Math.cos(this.angle) * this.lenght;  
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


 class Circle {
     constructor(position , velocity , color , radius ,ctx ){
         this.position = position;
         this.velocity = velocity;
         this.color = color;
         this.radius = radius;
         this.ctx = ctx ;
     }
     draw(){
         this.ctx.beginPath();
         this.ctx.arc(this.position.x , this.position.y, this.radius, 0 , Math.PI * 2);
         this.ctx.fillStyle = this.color;
         this.ctx.fill();
     }
     update(){
         let x = this.position.x  , y =this.position.y;
         let dx = this.velocity.x , dy = this.velocity.y;

         if(x + dx >=window.innerWidth || x+dx <=0 ){
            this.velocity.setX( -dx);
         }
         if(y+dy >= window.innerHeight || y +dy <= 0){
            this.velocity.setY( -dy);
         }
         this.position.add(this.velocity);
         this.draw();
     }
 }

 /**
  *   Setup Scene 
  */

  for(let i =0 ; i< number ; ++i){
     let position = new Vector();
     position.setPosition(window.innerWidth* Math.random() , window.innerHeight * Math.random());
     let velocity = new Vector();
     velocity.setLenght(7);
     velocity.setAngle(Math.PI * 2 * Math.random()); 
     let color =color_array[Math.floor(Math.random()*color_array.length)];
     let radius = (max_radius-min_radius) * Math.random() + min_radius;

     particle.push( new Circle (position , velocity , color , radius  ,ctx ));
  }

  /**
   *  Animation
   */

   function animate(){
       ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
       for(let i=0;i<particle.length;i++){
           particle[i].update();
       }
       requestAnimationFrame(animate);
   }

   animate();