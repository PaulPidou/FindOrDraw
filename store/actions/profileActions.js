
export const PROFILE_SET_LOCATION = 'profile/location/set';
export const PROFILE_SET_AGE= 'profile/age/set';
export const PROFILE_SET_LEVEL= 'profile/level/set';
export const PROFILE_ADD_NEED= 'profile/need/add';
export const PROFILE_REMOVE_NEED= 'profile/need/remove';
export const PROFILE_ADD_ATTRACT= 'profile/attract/add';
export const PROFILE_REMOVE_ATTRACT= 'profile/attract/remove';
export const PROFILE_COMPLETED= 'profile/completed';
export const DELETE_PROFILE = 'profile/delete';



export function setLocation(value) {
    return {type: PROFILE_SET_LOCATION, payload: value}
}

export function setAge(value) {
    return {type: PROFILE_SET_AGE, payload: value}
}

export function setLevel(value) {
    return {type: PROFILE_SET_LEVEL, payload: value}
}

export function addNeed(value) {
    return {type: PROFILE_ADD_NEED, payload: value}
}

export function removeNeed(value) {
    return {type: PROFILE_REMOVE_NEED, payload: value}
}

export function addAttract(value) {
    return {type: PROFILE_ADD_ATTRACT, payload: value}
}

export function removeAttract(value) {
    return {type: PROFILE_REMOVE_ATTRACT, payload: value}
}

export function setCompletion(value){
    return {type: PROFILE_COMPLETED, payload: value}
}

export function deleteProfile() {
    return {type: DELETE_PROFILE}
}