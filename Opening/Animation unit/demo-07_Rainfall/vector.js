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
