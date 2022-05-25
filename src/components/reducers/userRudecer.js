export function userReducer(state= null, action){
    switch(action.type){
        case 'Login': 
            return action.payload; 
        case "Logout": 
            localStorage.clear();
            return action.payload;
        default:
            return state;
    }   
}