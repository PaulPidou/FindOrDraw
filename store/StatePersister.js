// import {AsyncStorage} from 'react-native';

class StateLoader {

    static storageKey = `findordraw:state`

    async loadState() {
        return this.initializeState()

        // try {
        //
        //     let serializedState = await AsyncStorage.getItem(StateLoader.storageKey)
        //     if (serializedState === null) {
        //         return this.initializeState()
        //     }
        //
        //     return JSON.parse(serializedState)
        // }
        // catch (err) {
        //     console.error(err)
        //     return this.initializeState()
        // }
    }

    async saveState(state) {
        // try {
        //     let importantState = {
        //         //Things to save
        //         persist: state.persist
        //     }
        //     let serializedState = JSON.stringify(importantState)
        //     await AsyncStorage.setItem(StateLoader.storageKey, serializedState)
        // }
        // catch (err) {
        //     console.error('Error while saving into localstorage')
        // }
    }

    initializeState() {
        return { } //Empty initial state
    }
}

export default StateLoader