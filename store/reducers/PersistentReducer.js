import {

} from "../actions/GameActions";
import {RESET_TIMER} from "../actions/GameActions";
import {SET_TIMER} from "../actions/GameActions";
import {TICK_TIMER} from "../actions/GameActions";
import {stat} from "react-native-fs";
import {TIMER_DONE} from "../actions/GameActions";

const initialState = {
    firstVisit: false
}

export default function peristentReducer(state = initialState, action) {
    switch (action.type) {
        case READ_RULES:
            return {...state, firstVisit: true}
        default:
            return state
    }
}