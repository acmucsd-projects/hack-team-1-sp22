import React from 'react';
import './JoinRoom.css';
import NavBar from '../../NavBar/NavBar';
import { handleRoomCodeChange, handleRoomNameChange, handleUserNameChange } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const JoinRoom = () => {


    // redux state
    const { roomCode, roomName, userName } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleJoinRoom = () => {
        console.log(roomCode, userName);
    }

    const handleRoomCodeField = (e) => {
        dispatch(handleRoomCodeChange(e.target.value));
    }

    const handleUserNameField = (e) => {
        dispatch(handleUserNameChange(e.target.value));
    }


    return (
        <div>
            <NavBar text={"Create Room"} link="/create-room" />
            <div className="join-room">
                <div className='join-room-container'>
                    <div className='join-room-text'>
                        <h1 className='join-room-title'>Join Room</h1>
                        <p>
                            Hey 👋, enter a room code and an appropriate name to start asking questions!
                            {roomCode}
                            {userName}
                        </p>
                    </div>
                    <form className='enter-room-code'>
                        <div className='enter-room-code-input'>
                            <input type="number" placeholder="Room Code" onChange={(e) => handleRoomCodeField(e)}/>
                        </div>
                        <div className='join-room-form-input'>
                            <input type="text" placeholder="Appropriate Name" onChange={(e) => handleUserNameField(e)}/>
                        </div>
                    </form>
                    <div className='join-room-button'>
                        <button onClick={() => handleJoinRoom()} className='btn btn-primary'>Start Asking!</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default JoinRoom;