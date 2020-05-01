import {getStore} from "../storeInit";
import {moveGameStep} from "./GameActions";
import GameSteps from "../gameModel/GameSteps";
import GameGraph from "../gameModel/GameGraph";


export const SET_TIMER = 'game/set_timer';
export const CLEAR_TIMER = 'game/reset_timer';
export const TICK_TIMER = 'game/tick_timer';
export const TIMER_DONE = 'game/timer_done';

export function setTimer(seconds) {
    return (dispatch) => {

        let toGoSeconds = seconds
        const beginGameId = getStore().game.gameId

        const timerId = setInterval(() => {
            const state = getStore()
            if(beginGameId !== state.game.gameId){
                console.warn('Invalid game, cleaning timer')
                clearInterval(timerId)
            }

            toGoSeconds--
            dispatch({type: TICK_TIMER})

            if (toGoSeconds <= 0) {
                clearInterval(timerId)
                GameGraph.COMMON.gameOver(dispatch)
                dispatch({type: TIMER_DONE})
            }
        }, 1000)


        dispatch({
            type: SET_TIMER,
            payload: {
                time: seconds,
                timerId
            }
        })
    }
}

export function clearTimer() {
    const state = getStore();

    if (state.game.timerId) {
        clearInterval(state.game.timerId)
    }

    return {type: CLEAR_TIMER}
}
