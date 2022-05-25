import { combineReducers } from "redux";
import { userReducer } from "./userRudecer";
import { trackReducer } from "./track";
import { playerReducer } from "./player";
//เก็บ store
const rootReducer = combineReducers({
    user: userReducer,
    track: trackReducer,
    player: playerReducer,
});

export default rootReducer