const initialState = {
    roomCode: null, // 34017
    roomName: "", // Trevor's Room
    roomId: null, // Trevor's Room - 34017
    userName: "", // Marcelo
    isHost: false,
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
        case 'SET_IS_HOST':
            return {
                ...state,
                isHost: actions.payload
            }
        default:
            return state;
    }
}

export default Reducer;