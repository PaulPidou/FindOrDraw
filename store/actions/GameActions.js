export const SET_GAME_STATUS = 'game/set_game_status';
export const SET_GAME_MODE = 'game/set_game_mode';

export const SET_TF_READY = 'game/tf_ready'
export const SET_MODEL_READY= 'game/model_ready'


export function markModelAsReady() {
    return {type: SET_MODEL_READY}
}

export function markTfAsReady() {
    return {type: SET_TF_READY}
}


export function startGame() {

}

export function stopGame() {

}

export function switchGameMode(gameMode) {
    return {type: SET_GAME_MODE, payload: gameMode}
}