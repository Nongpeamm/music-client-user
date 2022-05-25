// const initialState = {
//     currentTrack: null,
// }
export function playerReducer(state= null, action){
    switch(action.type){
        case 'play': 
            return action.payload
        default:
            return state;
    }   
}