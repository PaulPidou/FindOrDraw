import {Platform} from "react-native";

export const isAndroid = Platform.OS === 'android';

export function uuidv4() {
    //https://stackoverflow.com/a/2117523/4047926
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
