import React, { useState, useEffect, useRef } from 'react';
import ResponseForm from '../ResponseForm';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CLOCK_TIME, STORE_ANSWERS } from '../../utils/GlobalStore/actions';
import { formatTime } from '../../utils/Format';

const defaultStartingTime = 60000;

function PlayerView({ startingTime }) {
    //Handles the time countdown while the player is answering
    
    const [timeRemaining, setTimeRemaining] = useState(defaultStartingTime);
    //Global state variable
    const state = useSelector(state => {
        return {
            clockTime: state.clockTime,
            playerName: state.playerName,
            questionObject: state.questionObject,
            gameMode: state.gameMode,
            gamePlayers: state.gamePlayers,
            autoCompleteList: state.autoCompleteList,
            answerSubmitted: state.answerSubmitted,
            storedAnswers: state.storedAnswers
        };
    });

    //Dispatch function to handle changes in global state
    const dispatch = useDispatch();

    useEffect(() => {
        if(timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(timeRemaining - 100);
            }, 100);
            dispatch({
                type: SET_CLOCK_TIME,
                clockTime: timeRemaining
            });
        }
    }, [dispatch,timeRemaining]);


    //When the user submits his her/answers, or when time runs out, this function will fire and change
    //the answers in the GlobalStore
    const onAnswerSubmit = answers => {
        dispatch({
            type: STORE_ANSWERS,
            storedAnswers: answers
        });
    }

    // console.log(`Stored Answers: ${state.storedAnswers}`);
    return (
        <div className='col-12'>
            <div className='row'>
                <div className='col-5'>
                    <h2>Category</h2>
                    <h3>{state.questionObject.category}</h3>
                </div>
                <div className='col-5'>
                    <h2>Time Left</h2>
                    <h3>{formatTime(timeRemaining)}</h3>
                </div>
            </div>
            <ResponseForm fjClueObject={state.questionObject} onAnswerSubmit={onAnswerSubmit} />
        </div>
    )
}

export default PlayerView