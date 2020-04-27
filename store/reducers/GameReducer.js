import {

} from "../actions/TimerActions";
import {RESET_TIMER} from "../actions/TimerActions";
import {SET_TIMER} from "../actions/TimerActions";
import {TICK_TIMER} from "../actions/TimerActions";
import {stat} from "react-native-fs";
import {TIMER_DONE} from "../actions/TimerActions";

const initialState = {
    timerId: null,
    timerTime: null,
    timerIsDone: false,

    gameRunning: false,
    gameMode: null,

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