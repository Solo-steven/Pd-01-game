class EventBus {
    constructor(){
        this.eventMap = new Map();   
    }
    on( eventString , triggerFunction){
        if(!this.eventMap.get(eventString)){
            let set =new Set();
            set.add(triggerFunction);
            this.eventMap.set(eventString, set);
            return ;
        }
        let functionSet=this.eventMap.get(eventString);
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
}



