class Particle{
    constructor(destination , ww, wh,color ,ctx){
       this.destination =destination;
       this.color = color;
       this.ctx =ctx;
       this.position = new Vector();
       this.position.setPosition(
           ( Math.random()>=0.5  ? ww+Math.random()*ww : 0-Math.random()*ww), 
           ( Math.random()>=0.5  ? wh+Math.random()*wh : 0-Math.random()*wh));
       this.velocity = new Vector();
       this.velocity.setLenght(10);
       this.velocity.setAngle(Math.PI * 2 * Math.random());
       this.acceleration = new Vector();
       this.acceleration.setPosition(0,0)
       this.radius = 5* Math.random() +5;
       this.fraction = Math.random()*0.029 +0.94;

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
       this.active = true;
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
       if(!this.active)
        return;
       this.ctx.fillStyle ='#000000';
       this.ctx.fillRect(0,0,this.canvas.width , canvas.height);
       for(let i=0;i<this.text_Particle.length;++i){
           this.text_Particle[i].update();
       }
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
   destroy(){
        this.active = false;
   }
}