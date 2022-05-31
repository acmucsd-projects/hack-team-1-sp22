import React, {useState} from 'react';
import './QuestionQueue.css';
import NavBar from '../../NavBar/NavBar';

const QuestionQueue = () => {

    const sampleQuestions = [
        "What is the capital of Germany?",
        "What is the capital of Italy?",
        "What is the capital of Spain?",
        "What is the capital of Portugal?",
        "What is the capital of Belgium?",
        "What is the capital of Austria?",
    ]

    const [question, setQuestion] = useState('');

    const sampleCode = 333902;
    const sampleRoom = "ACM Dev Presentation";

    return (
        <div>
            <NavBar text={"Join Room"} link="/" />
            <div className="question-room">
                <div className="question-room-header">
                    <h3 className='question-room-name'>Room Name: {sampleRoom} | Room Code: {sampleCode}</h3>
                </div>

                <div className='question-room-container'>    
                        <h1 className='create-room-title'>Question Queue</h1>
                        <div className='question-room-questions'>
                                {sampleQuestions.map((question, index) => {
                                    return (
                                    <div key={index} className='question-room-question'>
                                        <h3 key={index}>{question}</h3>
                                    </div>
                                    )
                                })}
                        </div>
                        <div className='create-room-form-input'>
                            <input type="text" placeholder="Ask your question..." />
                            <button className='btn btn-primary'>Ask</button>
                        </div>
                </div>
            </div>

        </div>
    )
};

export default QuestionQueue;