export const SET_GAME_STATUS = 'game/set_game_status';
export const SET_GAME_MODE = 'game/set_game_mode';



export function startGame() {

}

export function stopGame() {

}

export function switchGameMode(gameMode) {
    return {type: SET_GAME_MODE, payload: gameMode}
}