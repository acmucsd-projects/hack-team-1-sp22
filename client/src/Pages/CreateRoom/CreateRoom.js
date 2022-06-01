import React from 'react';
import './CreateRoom.css';
import NavBar from '../../NavBar/NavBar';
import { handleRoomIdChange, handleUserNameChange, handleIsHostChange, handleRoomCodeChange } from '../../Redux/Actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateRoom = () => {
    // create dispatch object
    const dispatch = useDispatch();

    // router navigation
    const navigate = useNavigate();


    // create ref for input fields
    const roomNameRef = React.useRef('');
    const maxNumRef = React.useRef('');

    const handleCreateRoom = (e) => {
        const roomName = roomNameRef.current.value;
        const maxNum = maxNumRef.current.value;

        // make username random uuid 6 digit
        const userName = Math.random().toString(36).substring(2, 7);

        let data = JSON.stringify({
            roomlimit: maxNum,
            roomname: roomName,
            roomhost: userName
        });

        axios.put('http://localhost:5000/room', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log('Room created!', res.data);
            dispatch(handleRoomIdChange(res.data.roomid));
            dispatch(handleRoomCodeChange(res.data.code));
            navigate('/room');
        }).catch(err => {
            console.log(err);
        });

        dispatch(handleUserNameChange(userName));
        dispatch(handleIsHostChange(true));


        roomNameRef.current.value = '';
        maxNumRef.current.value = '';
    }



    return (
        <div>
            <NavBar text={"Join Room"} link="/" />
            <div className="create-room">
                <div className='create-room-container'>
                    <div className='create-room-text'>
                        <h1 className='create-room-title'>Create Room</h1>
                        <p>
                            You can create a room to share your to your lecture of students so
                            they can start asking questions.
                        </p>
                    </div>
                    <form className='create-room-form'>
                        <div className='create-room-form-input'>
                            <input ref={roomNameRef} type="text" placeholder="Room Name" />
                        </div>
                        <div className='create-room-form-input'>
                            <input ref={maxNumRef} type="number" placeholder="Max Number of Students" />
                        </div>
                    </form>
                    <div className='create-room-button'>
                        <button onClick={(e) => handleCreateRoom(e)} className='btn btn-primary'>Create Room</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CreateRoom;