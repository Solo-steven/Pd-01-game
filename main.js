class EventBus {
    constructor(){
        this.eventMap = new Map();   
    }
    on( eventString , triggerFunction){
        let functionSet=this.eventMap.get(eventString);
        if(!functionSet){
            let set =new Set();
            set.add(triggerFunction);
            this.eventMap.set(eventString, set);
            return ;
        }
        functionSet.add(triggerFunction);
    }
    emit(eventString , payload){
        let function_set=this.eventMap.get(eventString);
        if(function_set){
            function_set.forEach(triggerFunction =>{
                triggerFunction(payload);
            })
        }
    }
    off(eventString){
        this.eventMap.delete(eventString);    
    }
    clear(){
        this.eventMap.clear();
    }
}


/**
 *  init app
 */
const app = new PIXI.Application({
     width  : window.innerWidth,
     height : window.innerHeight,
     atuoResize : true
});
document.body.appendChild(app.view);

/**
 *  set up function 
 */


function LoadingPicture(loader, jpg_array){
    if(!(loader instanceof PIXI.Loader)){
        console.log('loader type error or loader is empty .');
        return;
    }
    for(jpg of jpg_array ){
        loader.add(jpg);
    }
}

function SetUpFloor(loader, container, number_of_height, number_of_width , pixel=30){
    for(let i=0;i<number_of_height; ++i ){
        for(let j=0;j<number_of_width;++j){
            loader.load((loader, resources)=>{
                let sprite = new PIXI.Sprite(resources['floor_02'].texture);
                sprite.width  = pixel;
                sprite.height = pixel;
                sprite.x  = j* pixel;
                sprite.y  = i* pixel;
                container.addChild(sprite);
            })
        }
    }
}

function SetUpSceneObject(loader, info, container,pixel=30){
     loader.load((loader, resources)=>{
        for(data of info){
            let sprite = new PIXI.Sprite(resources[data.setting.name].texture);
            if(data.setting.Name){
                sprite.name = data.setting.Name;
            }
  
            for( let [key,property] of Object.entries(data.setting)){
                if(property  instanceof Function){
                    sprite[key]= property;
                    sprite[key]= sprite[key].bind(sprite);
                }
                else{
                    sprite[key]= property*pixel;
                }
            }
            for( let [key,property] of Object.entries(data.other)){
                if(property  instanceof Function){
                    sprite[key]= property;
                    sprite[key]= sprite[key].bind(sprite);
                }
                else{
                    sprite[key]= property;
                }
            }
            container.addChild(sprite);
            SetUpConnect(container.children , Bus)
        }
        console.log('1:',container.children);
    })
}


function SetUpConnect(array , bus){
    for(obj of array){
        if(obj.initBusEvent instanceof Function){
            obj.initBusEvent(bus);
        }
    }

}


function SetUpPlayer(loader, info ,container  ,pixel=30){
    loader.load((loader , resources)=>{
        let sprite =new PIXI.Sprite(resources[info.name].texture);
        sprite.x = info.x * pixel;
        sprite.y = info.y * pixel;
        sprite.width  = info.width  * pixel;
        sprite.height = info.height * pixel;
        container.addChild(sprite);
    })
}


function SetUpText(objectArray , container){
    for(let object of objectArray){
        object.container = container;
        for(let [key ,property] of Object.entries(object)){
                if(property instanceof Function){
                    object[key] = object[key].bind(object);
                }
        }
    }
    container.x = 2* 50;
    container.y = 10 * 50;
    SetUpConnect(objectArray , Bus)
}

/**
 * 
 *  keyboard-Control logic
 */

function MoveToCollisionDetect(mover, dir, pixil, stander){
    let x = mover.x + mover.width/2 , y = mover.y + mover.height/2;
    if(dir === 'up' || dir === 'Up'){
        if(y - pixil >= stander.y && y - pixil < stander.y + stander.height ){
            if(x >= stander.x && x < stander.x + stander.width )
            {console.log(x, y, stander.x , stander.y);
              return true;}
        }
        return false;   
    }else if(dir === 'right' || dir === 'Right'){
        if(x + pixil >= stander.x && x + pixil < stander.x + stander.width){
            if(y >= stander.y && y < stander.y + stander.height)
                return true;
        }
        return false; 
    }else if(dir === 'down' || dir === 'Down'){
        if(y + pixil >= stander.y && y + pixil < stander.y + stander.height){
            if(x >= stander.x && x < stander.x + stander.width )
                return true;
        }
        return false;        
    }else if(dir === 'left' || dir === 'Left'){
        if(x - pixil >= stander.x && x - pixil < stander.x + stander.width){
            if(y >= stander.y && y < stander.y + stander.height){
                return true;
            }
        }
        return false;  
    }
}


function KeyBoardControl(event, player, scene, npc, height, width ,pixel){
    if(event.code === 'ArrowUp'){
        console.log('ArrowUp')
        if((player.y - pixel) < 0)
            return;
        for(obj of scene){
            if(MoveToCollisionDetect(player, 'up', pixel, obj))
               return ;
        }   
        for(obj of npc){
            if(MoveToCollisionDetect(player, 'up', pixel, obj))
               return ;
        }  
        player.y  -= pixel ;
    }else if(event.code === 'ArrowRight'){
        if(player.x + pixel >= width * pixel)
            return ; 
        for(obj of scene){
            if(MoveToCollisionDetect(player, 'right', pixel, obj))
                return ;
        }    
        for(obj of npc){
            if(MoveToCollisionDetect(player, 'right', pixel, obj))
               return ;
        }  
        player.x  += pixel;
    }else if(event.code === 'ArrowDown'){
        if(player.y + pixel >= height * pixel)
            return;
        for(obj of scene){
            if(MoveToCollisionDetect(player, 'down', pixel, obj))
                return ;
        }      
        for(obj of npc){
            if(MoveToCollisionDetect(player, 'down', pixel, obj))
               return ;
        }  
        player.y  += pixel;
    }else if(event.code === 'ArrowLeft'){
        if(player.x - pixel < 0)
          return ;
        for(obj of scene){
            if(MoveToCollisionDetect(player, 'left', pixel, obj))
                return ;
        }  
        for(obj of npc){
            if(MoveToCollisionDetect(player, 'left', pixel, obj))
               return ;
        }     
        player.x  -= pixel;
    }else if(event.code ==='KeyZ'){
        for(let obj of scene){
            if(obj.inActive instanceof Function){
                obj.inActive();
            }
        }
        for(let obj of npc){
            if(obj.inActive instanceof Function){
                obj.inActive();
            }
        }
    }
}


function GameLoop( player , sceneobject_array ,npc_array){
    for (obj of sceneobject_array){
        if(obj.isTrigger instanceof Function){
            obj.isTrigger(player);
        }
    }
    for(obj of npc_array){
        if(obj.isTrigger instanceof Function){
            obj.isTrigger(player);
        }
    }
}

/**
 *   main set up flow 
 */
const Bus = new EventBus();

function StartScene(){
        Bus.clear();
        const loader= new PIXI.Loader();
        LoadingPicture(loader, jpg_array);


        const Floor_container = new PIXI.Container(),
            number_of_width=20, number_of_height=14 , 
            cell_pixel = 50;
        SetUpFloor(loader, Floor_container, number_of_height, number_of_width ,cell_pixel);

        const SceneObject_container= new PIXI.Container();
        SetUpSceneObject(loader, SceneObject_info , SceneObject_container ,cell_pixel);
        const SceneObject_array = SceneObject_container.children;

        const Npc_container = new PIXI.Container();
        SetUpSceneObject(loader, NpcObject_info , Npc_container, cell_pixel);    
        const Npc_array = Npc_container.children;

        const Player_container = new PIXI.Container();
        SetUpPlayer(loader, Player_info , Player_container,  cell_pixel);     
        const Player = Player_container.children;

        const Text_container = new PIXI.Container();
        SetUpText(Text_Info, Text_container);      

        app.stage.addChild(Floor_container);
        app.stage.addChild(SceneObject_container);
        app.stage.addChild(Npc_container);
        app.stage.addChild(Player_container);
        app.stage.addChild(Text_container);

        document.addEventListener('keydown', (event)=>{
            KeyBoardControl(event, Player[0] ,SceneObject_array, Npc_array  ,number_of_height, number_of_width, cell_pixel)
        })

        app.ticker.add((delta)=>( GameLoop( Player[0], SceneObject_array, Npc_array)));
        app.ticker.start();
}

StartScene();


