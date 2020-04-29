import {

} from "../actions/TimerActions";
import {RESET_TIMER} from "../actions/TimerActions";
import {SET_TIMER} from "../actions/TimerActions";
import {TICK_TIMER} from "../actions/TimerActions";
import {TIMER_DONE} from "../actions/TimerActions";
import {SET_GAME_STATUS, SET_GAME_STEP, SET_FINDORDRAWELEMENT,
    SET_MODEL_READY, SET_TF_READY} from "../actions/GameActions";

const initialState = {
    timerId: null,
    timerTime: null,
    timerIsDone: false,

    tfReady: false,
    modelReady: false,

    gameStatus: false,
    gameStep: null,
    gameElement: null
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

        case SET_TF_READY:
            return {...state, tfReady: true }
        case SET_MODEL_READY:
            return {...state, modelReady: true }

        case SET_GAME_STEP:
            return {...state, gameStep: action.payload }
        case SET_GAME_STATUS:
            return {...state, gameStatus: action.payload }
        case SET_FINDORDRAWELEMENT:
            return {...state, gameElement: action.payload }

        default:
            return state
    }
}