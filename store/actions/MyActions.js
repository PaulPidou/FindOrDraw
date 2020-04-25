export const MY_ACTION = 'MY_ACTION'

export function myAction(value) {
    return {type: MY_ACTION, payload: value}
}
