import {

} from "../actions/TimerActions";
import {CLEAR_TIMER} from "../actions/TimerActions";
import {SET_TIMER} from "../actions/TimerActions";
import {TICK_TIMER} from "../actions/TimerActions";
import {TIMER_DONE} from "../actions/TimerActions";
import {
    SET_GAME_STATUS, SET_GAME_STEP, SET_FINDORDRAWELEMENT,
    SET_MODEL_READY, SET_TF_READY, PICK_WORDS, GAME_START, GAME_EXIT, INCREMENT_SCORE
} from "../actions/GameActions";
import GameSteps from "../gameModel/GameSteps";
import {uuidv4} from "../../helpers/Utils";

const initialState = {
    timerId: null,
    timerTime: null,
    timerIsDone: false,

    tfReady: false,
    drawModelReady: false,
    findModelReady: false,

    gameStatus: false,
    gameStep: null,
    gameElement: null,
    gameId: null,

    wordToFind: null,
    wordToDraw: null,

    score: 0,
}

export default function myReducer(state = initialState, action) {
    switch (action.type) {
        case CLEAR_TIMER:
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
            return {...state, [action.payload === 'DRAW' ? "drawModelReady" : "findModelReady"]: true }
        case SET_GAME_STEP:
            return {...state, gameStep: action.payload }

        case GAME_START:
            return {...state, gameStatus: true, gameStep: GameSteps.PICK, gameId: uuidv4(), score: 0}

        case GAME_EXIT:
            return {...state, gameStatus: false, gameStep: null, gameId: null}

        case SET_FINDORDRAWELEMENT:
            return {...state, gameElement: action.payload }

        case PICK_WORDS:
            return {...state, wordToDraw: action.payload.toDraw, wordToFind: action.payload.toFind}

        case INCREMENT_SCORE:
            return {...state, score: state.score + 1}

        default:
            return state
    }
}
