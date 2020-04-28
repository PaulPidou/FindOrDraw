import {getStore} from "../storeInit";


export const SET_TIMER = 'game/set_timer';
export const RESET_TIMER = 'game/reset_timer';
export const TICK_TIMER = 'game/tick_timer';
export const TIMER_DONE = 'game/timer_done';

export function setTimer(seconds) {
    return (dispatch) => {

        const state = getStore();

        if (state.game.timerId) {
            clearInterval(state.game.timerId)
        }

        const timerId = setInterval(() => {

            dispatch({type: TICK_TIMER})

            const state = getStore();
            if (state && state.game.timerTime && state.game.timerTime <= 0) {
                clearInterval(state.game.timerId)
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

export function resetTimer() {
    const state = getStore();

    if (state.game.timerId) {
        clearInterval(state.game.timerId)
    }

    return {type: RESET_TIMER}
}