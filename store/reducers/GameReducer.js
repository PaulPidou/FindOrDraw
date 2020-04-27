import {

} from "../actions/GameActions";
import {RESET_TIMER} from "../actions/GameActions";
import {SET_TIMER} from "../actions/GameActions";
import {TICK_TIMER} from "../actions/GameActions";
import {stat} from "react-native-fs";
import {TIMER_DONE} from "../actions/GameActions";

const initialState = {
    timerId: null,
    timerTime: null,
    timerIsDone: false,
}

export default function myReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_TIMER:
            return {...state, timerId: null, timerTime: null, timerIsDone: false }
        case SET_TIMER:
            return {...state, timerId: action.payload.timerId, timerTime: action.payload.time, timerIsDone: false }
        case TICK_TIMER:
            return {...state, timerTime: state.timerTime - 1}
        case TIMER_DONE:
            return {...state, timerId: null, timerTime: null, timerIsDone: true }
        default:
            return state
    }
}