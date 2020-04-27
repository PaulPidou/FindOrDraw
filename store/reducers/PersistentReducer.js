import {

} from "../actions/TimerActions";
import {RESET_TIMER} from "../actions/TimerActions";
import {SET_TIMER} from "../actions/TimerActions";
import {TICK_TIMER} from "../actions/TimerActions";
import {stat} from "react-native-fs";
import {TIMER_DONE} from "../actions/TimerActions";

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