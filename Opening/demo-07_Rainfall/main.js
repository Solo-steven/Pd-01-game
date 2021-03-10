const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

class RainFallParticle{
    constructor(position , velocity , color , radius ,ctx){
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.radius = radius;
        this.ctx = ctx ;
    }
    draw(){
        this.ctx.beginPath();
        //this.ctx.arc(this.position.x , this.position.y, this.radius, 0 , Math.PI * 2);
        this.ctx.fillStyle = this.color;
        let size = Math.floor(Math.random()*8 )+16;
        ctx.font = `${size}px serif`;
        let number = Math.floor(Math.random()*2);
        let char =  String.fromCharCode(65 + Math.floor(28*Math.random()));
        this.ctx.fillText (`${char}`, this.position.getX(), this.position.getY());
        this.ctx.fill();
    }
    update(){
        /**
         *   x and dx(0) and dy should remain the same .
         */
        let y =this.position.y;
        let dy = this.velocity.y;
        if(y+dy >= window.innerHeight ){
           this.position.setY(0 -this.radius);
        }
        this.position.add(this.velocity);
        this.draw();
    }
}

const particle = [];
const number =1000; 
for(let i =0; i<number ;++i){
    let position = new Vector();
    position.setPosition(window.innerWidth * Math.random(), Math.random()*window.innerHeight);
    let velocity = new Vector();
    velocity.setPosition(0 , 4 *Math.random()+5);
    particle.push(new RainFallParticle(position, velocity, 'rgba(101, 206, 40, 0.808)',4, ctx));
}

function animate(){
    ctx.fillStyle = 'rgba(0,0,0,.1)'
    ctx.fillRect(0, 0 , window.innerWidth , window.innerHeight);
    particle.forEach(particle=>{
        particle.update();
    })
    /*
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.font = '800 120px serif';
    ctx.textAlign ='center';
    ctx.fillText('Pd-1 Game', window.innerWidth/2, window.innerHeight/2);*/
    setTimeout(()=>{ requestAnimationFrame(animate)} , 30)
    //requestAnimationFrame(animate)
}
ctx.fillStyle ='black';
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

requestAnimationFrame(animate)

