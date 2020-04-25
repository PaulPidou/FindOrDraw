import {
    DELETE_PROFILE,
    PROFILE_ADD_ATTRACT,
    PROFILE_ADD_NEED, PROFILE_COMPLETED, PROFILE_REMOVE_ATTRACT,
    PROFILE_REMOVE_NEED,
    PROFILE_SET_AGE,
    PROFILE_SET_LEVEL,
    PROFILE_SET_LOCATION
} from "../actions/profileActions";

const initialState = {
    location: undefined,
    age: undefined,
    level: undefined,
    needs: undefined,
    attracts: [],
    isCompleted: false,
}

export default function myReducer(state = initialState, action) {
    switch (action.type) {
        case PROFILE_SET_LOCATION:
            return {...state, location: action.payload}
        case PROFILE_SET_AGE:
            return {...state, age: action.payload}
        case PROFILE_SET_LEVEL:
            return {...state, level: action.payload}
        case PROFILE_ADD_NEED:
            return {...state, needs: state.needs ? [...state.needs, action.payload] : [action.payload]}
        case PROFILE_REMOVE_NEED:
            return {...state, needs: state.needs ? state.needs.filter(e => e !== action.payload) : state.needs}
        case PROFILE_ADD_ATTRACT:
            return {...state, attracts: state.attracts ? [...state.attracts, action.payload] : [action.payload]}
        case PROFILE_REMOVE_ATTRACT:
            return {
                ...state,
                attracts: state.attracts ? state.attracts.filter(e => e !== action.payload) : state.attracts
            }
        case PROFILE_COMPLETED:
            return {...state, isCompleted: action.payload}
        case DELETE_PROFILE:
            return {
                location: undefined,
                age: undefined,
                level: undefined,
                needs: undefined,
                attracts: [],
                isCompleted: false,
            }
        default:
            return state
    }
}