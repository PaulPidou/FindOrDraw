import GameSteps from "./GameSteps";
import {GAME_EXIT, GAME_START, INCREMENT_SCORE, PICK_WORDS, SET_GAME_STEP} from "../actions/GameActions";

import QUICKDRAW_CLASSES from "../../assets/model/quickdraw_classes";
import IMAGENET_CLASSES from "../../assets/model/imagenet_classes.json";
import {CLEAR_TIMER, clearTimer, setTimer} from "../actions/TimerActions";


function getRandomElement(classes) {
    return classes[Math.floor(Math.random() * classes.length)];
}


const commonTransitions = {
    exitGame : (dispatch) => {
        dispatch(clearTimer())
        dispatch({type: GAME_EXIT})
    },
    gameOver: (dispatch) => {
        dispatch({type: SET_GAME_STEP, payload: GameSteps.SCORE})
    },
    startGame: (dispatch) => {
        pickNewWord(dispatch)
        dispatch({type: GAME_START})
        dispatch(setTimer(3 * 60))
    }
}

const pickNewWord = (dispatch) => {
    const toDraw = getRandomElement(QUICKDRAW_CLASSES).split(',')[0]
    const toFind = getRandomElement(IMAGENET_CLASSES).split(',')[0]

    dispatch({type: PICK_WORDS, payload: {toDraw, toFind}})
}

const win = (dispatch) => {
    dispatch({type: INCREMENT_SCORE})
    dispatch({type: SET_GAME_STEP, payload: GameSteps.WIN})
}

const skip = (dispatch) => {
    pickNewWord(dispatch)
    dispatch({type: SET_GAME_STEP, payload: GameSteps.PICK})
}

const game = {
    PICK: {
        ...commonTransitions,
        goToDraw: (dispatch) => {
            dispatch({type: SET_GAME_STEP, payload: GameSteps.DRAW})
        },
        goToFind: (dispatch) => {
            dispatch({type: SET_GAME_STEP, payload: GameSteps.FIND})
        },
    },
    DRAW: {
        ...commonTransitions,
        win,
        skip,
        goToFind: (dispatch) => {
            dispatch({type: SET_GAME_STEP, payload: GameSteps.FIND})
        },
    },
    FIND: {
        ...commonTransitions,
        win,
        skip,
        goToDraw: (dispatch) => {
            dispatch({type: SET_GAME_STEP, payload: GameSteps.DRAW})
        },
    },
    WIN: {
        ...commonTransitions,
        next: skip
    },
    SCORE: {
        ...commonTransitions,
        replay: (dispatch) => {
            commonTransitions.exitGame(dispatch)
            commonTransitions.startGame(dispatch)
        }
    },
    COMMON: {
        ...commonTransitions
    }
}

export default game

