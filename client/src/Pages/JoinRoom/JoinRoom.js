import React from 'react';
import './JoinRoom.css';
import NavBar from '../../NavBar/NavBar';

const JoinRoom = () => {

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
                            <input type="text" placeholder="Room Code" />
                        </div>
                        <div className='join-room-form-input'>
                            <input type="text" placeholder="Appropriate Name" />
                        </div>
                    </form>
                    <div className='join-room-button'>
                        <button className='btn btn-primary'>Start Asking!</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default JoinRoom;