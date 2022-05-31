import React from 'react';
import './JoinRoom.css';
import NavBar from '../../NavBar/NavBar';
import { handleRoomIdChange, handleUserNameChange, handleRoomNameChange } from '../../Redux/Actions';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const JoinRoom = () => {

    // router navigation
    const navigate = useNavigate();

    // local useState
    const [roomCodeField, setRoomCodeField] = React.useState('');
    const [userNameField, setUserNameField] = React.useState('');


    // manage userName, roomname and roomId redux state
    // const { roomName, userName, roomId } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleJoinRoom = () => {

        // send roomCode to server and store code and id in redux state
        let data = JSON.stringify({
            code: parseInt(roomCodeField),
        });

        // let config = {
        //     method: 'post',
        //     url: 'http://localhost:5000/room',
        //     data: data,
        //     headers: { 'Content-Type': 'application/json' }
        // }

        axios.post('http://localhost:5000/room', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                dispatch(handleRoomNameChange(res.data.roomname));
                dispatch(handleRoomIdChange(res.data.roomid));
                dispatch(handleUserNameChange(userNameField));

                navigate('/room');
            })
            .catch(err => {
                console.log(err);
            }
            );

    }

    const handleRoomCodeField = (e) => {
        setRoomCodeField(e.target.value);
    }

    const handleUserNameField = (e) => {
        setUserNameField(e.target.value);
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
                        </p>
                    </div>
                    <form className='enter-room-code'>
                        <div className='enter-room-code-input'>
                            <input type="number" placeholder="Room Code" onChange={(e) => handleRoomCodeField(e)} />
                        </div>
                        <div className='join-room-form-input'>
                            <input type="text" placeholder="Appropriate Name" onChange={(e) => handleUserNameField(e)} />
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