import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers/RootReducer";
 import StatePersister from "./StatePersister";


let store;

export async function initStore(){
    const middleware = [thunk]

    const statePersister = new StatePersister();

    store = createStore(
        rootReducer, await statePersister.loadState(),
        //rootReducer, {},
        compose(applyMiddleware(...middleware))
    );

    store.subscribe(() => {
        statePersister.saveState(store.getState())
    });
    return store
}


export const getStore = function () {
    return store.getState()
}

export const getReduxStore = function () {
    return store
}