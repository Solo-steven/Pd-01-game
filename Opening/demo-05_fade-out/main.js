/**
 *  class 
 */


class FadeRect{
    constructor(ctx, x, y, width , height , wait_time, fade_time ){
         this.ctx =ctx;
         this.x = x ;
         this.y = y ;
         this.width = width;
         this.height = height;
         this.wait_time = wait_time;
         this.fade_time =fade_time;

         this.isActive = false;
         this.colorStop =0 ;
    }
    startCount(){
        setTimeout( () => {
            this.isActive = true;
        }, this.wait_time*1000);
    }
    draw(){
        if( (this.colorStop +  (1/(this.fade_time*60)) )<1)
            this.colorStop +=  1/(this.fade_time*60);
        else 
            this.colorStop =1;    
        const grid = ctx.createLinearGradient(0, this.y, 0 ,this.y + this.height);
        grid.addColorStop(this.colorStop , 'black');
        grid.addColorStop(1, 'white');
        ctx.fillStyle = grid ;
        ctx.fillRect(this.x, this.y , this.width, this.height);

    }
    update(){
        if(this.isActive){
            this.draw();
        }else {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x, this.y , this.width, this.height)
        }
    }
}


class FadeAnimation {
    constructor(canvas, ctx,  col_number , row_number, fade_time , start_to_fade_time ){
        this.ctx = ctx;
        this.col_number = col_number ;
        this.row_number = row_number;
        this.start_x = 0 
        this.start_y =0;
        this.ww =canvas.width;
        this.wh = canvas.height;;
        this.rect_width = (canvas.width/col_number )
        this.rect_height =(canvas.height/row_number);
        this.rectArray = [];
        this.fade_time= fade_time;
        this.start_to_fade_time =start_to_fade_time;

        this.animate = this.animate.bind(this);
    }
    init(){
        for(let i=0; i< this.row_number ;++i){
            for(let j = 0; j < this.col_number ; ++j){
                this.rectArray.push(new FadeRect(    
                    this.ctx,    
                    this.start_x+ (this.rect_width * (j)) , 
                    this.start_y + (this.rect_height * (i)), 
                    this.rect_width, 
                    this.rect_height, 
                    this.start_to_fade_time+ this.fade_time*(i* this.col_number + j),
                    this.fade_time ))
            }
        }
        console.log(this.rectArray)
        this.rectArray.forEach(rect=>{
            rect.startCount();
        })
        this.drawText();
    }
    animate(){
        for(let i=0;i<this.rectArray.length;++i){
            this.rectArray[i].update();
        }
        this.drawText();
        requestAnimationFrame(this.animate);
    }
    end(){
        
    }

    drawText(){
        ctx.font = '160px serif';
        ctx.textAlign = 'center';
        ctx.fillStyle ='black';
        ctx.fillText("NCKU CSIE", this.ww/2, this.wh/2);
    }

}

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');


let animate = new FadeAnimation(canvas, ctx ,10, 10, 0.08, 0.2);
animate.init();
requestAnimationFrame(animate.animate)