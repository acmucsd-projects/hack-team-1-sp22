const initialState = {
    roomCode: null,
    roomName: "",
    roomId: null,
    userName: "",

}

const Reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case 'SET_ROOM_CODE':
            return {
                ...state,
                roomCode: actions.payload
            }
        case 'SET_ROOM_NAME':
            return {
                ...state,
                roomName: actions.payload
            }
        case 'SET_USER_NAME':
            return {
                ...state,
                userName: actions.payload
            }
        case 'SET_ROOM_ID':
            return {
                ...state,
                roomId: actions.payload
            }
        default:
            return state;
    }
}

export default Reducer;