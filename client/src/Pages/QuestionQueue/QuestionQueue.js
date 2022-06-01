import React, {useState, useRef, useEffect} from 'react';
import './QuestionQueue.css';
import NavBar from '../../NavBar/NavBar';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const QuestionQueue = () => {
    // navigator
    const navigate = useNavigate();

    // local state for questions and socket
    const [questions, setQuestions] = useState([]);
    const [socket, setSocket] = useState([]);

    // ref for input field
    const inputRef = useRef('');


    // select roomId and userName from redux state
    const { roomId, userName, isHost, roomCode } = useSelector(state => state);



    // join room using id on socket connection and listen to new messages
    useEffect(() => {

        /// initialize socket
        let socketVar = ( io('http://localhost:5000', {
            transports: [ 'websocket' ],

        }));
        console.log('Connecting socket...');

        console.log(`roomId: ${roomId} userName: ${userName}`);
        
        // join room
        socketVar.emit('login', {name: userName, room: roomId}, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Connected to room!');
            }
        });
 

        // subscribe to new messages (questions)
        if (socketVar){
            socketVar.on('message', msg => {
                console.log('Room event received!');
                console.log(msg);
                // set questions to history if joining for first time
                if (Array.isArray(msg)) {
                    setQuestions((prev) =>  [...prev, ...msg]);
                } else {
                    setQuestions((prev) =>  [...prev, msg]);
                }

                // // set questions to msg if asking first question
                // if (!questions) {
                //     setQuestions([msg]);
                // }

                // // otherwise add to existing question
                // setQuestions((prev) => [...prev, msg]);
              });
        }

        setSocket(socketVar);

        let data = JSON.stringify({
            code: roomCode,
        });

        // disconnect socket on dismount
        return () => {
            console.log('Disconnecting socket...');
            socket.disconnect();

            axios.post('http://localhost:5000/room', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(err => {
                console.log(err);
            });

        };

    }, []);


    useEffect(() => {
        console.log('questions', questions);
    }, [questions]);


    const handleAskButton = (e) => {
        e.preventDefault();
        const message = inputRef.current.value;
        if (socket) {
            socket.emit('sendMessage', message, (result) => {
                console.log(result)});
        } else {
            console.log('socket not connected', socket);
        }
        inputRef.current.value = '';
    }

    const handleEndButton = (e) => {
        e.preventDefault();


        let data = JSON.stringify({
            roomid: roomId,
            code: roomCode,
            roomhost: userName
        });
        console.log(data)

        axios.put(`http://localhost:5000/room/delete`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("room deleted")
            window.location.href = '/';
        }).catch (err => {
            console.log(err)
        });

        
    }


    return (
        <div>
            <NavBar text={"Join Room"} link="/" />
            <div className="question-room">
                <div className="question-room-header">
                    <h3 className='question-room-name'>{roomId}</h3>
                </div>

                <div className='question-room-container'>    
                        <h1 className='create-room-title'>Question Queue</h1>
                        <div className='question-room-questions'>
                                {questions ? questions.map((question, index) => {
                                    return (
                                    <div key={index} className='question-room-question'>
                                        <h3 key={index}>{question.text}</h3>
                                    </div>
                                    )
                                }): null}
                        </div>
                        <div className='create-room-form-input'>
                            {isHost ? null : <input ref={inputRef} type="text" placeholder="Ask your question..." />}
                            {isHost ? null : <button onClick={(e) => handleAskButton(e)} className='btn btn-primary'>Ask</button>}
                            {isHost ? <button onClick={(e) => handleEndButton(e)} className='btn btn-primary'>End Room</button> : null}
                        </div>
                </div>
            </div>

        </div>
    )
};

export default QuestionQueue;