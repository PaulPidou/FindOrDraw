import {combineReducers} from 'redux'
import GameReducer from './GameReducer'
import PersistentReducer from "./PersistentReducer";

const rootReducer = combineReducers({
    game: GameReducer,
    persist: PersistentReducer,
})

export default rootReducer
