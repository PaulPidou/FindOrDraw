import GameSteps from "../../helpers/GameSteps";
import {RESET_TIMER, resetTimer, setTimer} from "./TimerActions";
import {getStore} from "../storeInit";

export const SET_TF_READY = 'game/tf_ready';
export const SET_MODEL_READY = 'game/model_ready';

export const SET_GAME_STEP = 'game/step';
export const SET_GAME_STATUS = 'game/status';
export const SET_FINDORDRAWELEMENT = 'game/findordrawelement'


export function markModelAsReady() {
    return {type: SET_MODEL_READY}
}

export function markTfAsReady() {
    return {type: SET_TF_READY}
}

export function startGame() {
    return (dispatch) => {
        dispatch({type: SET_GAME_STATUS, payload: true})
        dispatch({type: SET_GAME_STEP, payload: GameSteps.MENU})
    }
}

export function stopGame() {
    return (dispatch) => {
        dispatch(resetTimer())
        dispatch({type: SET_GAME_STATUS, payload: false})
        dispatch({type: SET_GAME_STEP, payload: null})
    }
}

export function resetGame() {
    return (dispatch) => {
        dispatch(resetTimer())
        dispatch({type: SET_GAME_STEP, payload: GameSteps.MENU})
    }
}

export function moveGameStep(step, payload) {
    return (dispatch) => {
        const state = getStore()
        const currentStep = state.game.gameStep
        if(currentStep === GameSteps.MENU && step === GameSteps.PICK){
            setTimer(3 * 60)(dispatch)
        }
        dispatch({type: SET_GAME_STEP, payload: step})
        dispatch({type: SET_FINDORDRAWELEMENT, payload: payload})
    }
}