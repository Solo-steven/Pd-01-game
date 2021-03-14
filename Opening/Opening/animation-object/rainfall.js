
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
class RainFallAnimation{
    constructor(canvas , ctx , number, rainColor , backgroundColor){
        this.active = true;
        this.canvas = canvas;
        this.ctx = ctx ; 
        this.number = number;
        this.rainColor = rainColor;
        this.backgroundColor = backgroundColor;
        this.rainArray = []
    }
    init(){
        for(let i =0 ;i<this.number; ++i){
            let position = new Vector();
            position.setPosition(window.innerWidth * Math.random(), Math.random()*window.innerHeight);
            let velocity = new Vector();
            velocity.setPosition(0 , 4 *Math.random()+5);
            this.rainArray.push(new RainFallParticle(position, velocity, this.rainColor ,4, ctx))
        }
    }
    animate(){
        if(!this.active)
            return;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0,0,this.canvas.width , this.canvas.height);
        this.rainArray.forEach(particle=>{
            particle.update();
        })
    }
    end(){

    }
    destroy(){
        this.active = false;
    }

}