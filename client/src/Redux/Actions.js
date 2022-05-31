import { SET_ROOM_CODE, SET_ROOM_NAME, SET_USER_NAME } from "./ActionTypes";

export const handleRoomCodeChange = payload => ({
    type: SET_ROOM_CODE,
    payload
});

export const handleRoomNameChange = payload => ({
    type: SET_ROOM_NAME,
    payload
});

export const handleUserNameChange = payload => ({
    type: SET_USER_NAME,
    payload
});