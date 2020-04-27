import {

} from "../actions/GameActions";
import {RESET_TIMER} from "../actions/GameActions";
import {SET_TIMER} from "../actions/GameActions";
import {TICK_TIMER} from "../actions/GameActions";
import {stat} from "react-native-fs";

const initialState = {
    timerId: null,
    timerTime: null
}

export default function myReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_TIMER:
            return {...state, timerId: null, timerTime: null }
        case SET_TIMER:
            return {...state, timerId: action.payload.timerId, timerTime: action.payload.time }
        case TICK_TIMER:
            return {...state, timerTime: state.timerTime - 1}
        default:
            return state
    }
}