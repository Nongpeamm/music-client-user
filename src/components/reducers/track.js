export function trackReducer(state= null, action){
    switch(action.type){
        case 'add': 
            return action.payload; 
        default:
            return state;
    }   
}