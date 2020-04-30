import GameSteps from "../gameModel/GameSteps";
import {CLEAR_TIMER, clearTimer, setTimer} from "./TimerActions";
import {getStore} from "../storeInit";

export const SET_TF_READY = 'game/tf_ready';
export const SET_MODEL_READY = 'game/model_ready';

export const SET_GAME_STEP = 'game/step';
export const SET_GAME_STATUS = 'game/status';
export const SET_FINDORDRAWELEMENT = 'game/findordrawelement'

export const GAME_START = "game/start";
export const GAME_EXIT = "game/exit";

export const PICK_WORDS = 'game/pickWords'

export const INCREMENT_SCORE = 'game/score/inc'


export function markModelAsReady(model) {
    return {type: SET_MODEL_READY, payload: model}
}

export function markTfAsReady() {
    return {type: SET_TF_READY}
}
