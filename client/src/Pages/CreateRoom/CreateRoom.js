import React from 'react';
import './CreateRoom.css';
import NavBar from '../../NavBar/NavBar';

const CreateRoom = () => {

    return (
        <div>
            <NavBar text={"Join Room"} link="/" />
            <div className="create-room">
                <div className='create-room-container'>
                    <div className='create-room-text'>
                        <h1 className='create-room-title'>Create Room</h1>
                        <p>
                            Hey prof! You can create a room to share your to your lecture of students so
                            they can start asking questions.
                        </p>
                    </div>
                    <form className='create-room-form'>
                        <div className='create-room-form-input'>
                            <input type="text" placeholder="Room Name" />
                        </div>
                        <div className='create-room-form-input'>
                            <input type="number" placeholder="Max Number of Students" />
                        </div>
                    </form>
                    <div className='create-room-button'>
                        <button className='btn btn-primary'>Create Room</button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default CreateRoom;