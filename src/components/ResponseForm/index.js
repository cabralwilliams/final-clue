import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnswerBox from '../AnswerBox';
import { 
    MAY_16_2014
} from '../../utils/RealQuestions';
import { STORE_ANSWERS } from '../../utils/GlobalStore/actions';

function ResponseForm({ fjClueObject, onAnswerSubmit }) {
    const [formState, setFormState] = useState({});
    const [pageLoaded,setPageLoaded] = useState(false);
    const [fjObject,setFJObject] = useState(fjClueObject);
    const [inputArray,setInputArray] = useState([]);

    const state = useSelector(state => {
        return { clockTime: state.clockTime, storedAnswers: state.storedAnswers };
    });

    const dispatch = useDispatch();

    useEffect(() => {
        //Will load the inputArray with the proper integers corresponding to the number of
        //answers that need to be submitted
        if(!pageLoaded) {
            if(fjObject.matchCount === true) {
                const tempInputArray = [];
                for(let i = 0; i < fjObject.correctAnswer.length; i++) {
                    tempInputArray.push(i);
                }
                setInputArray(tempInputArray);
            } else {
                const tempInputArray = [];
                for(let i = 0; i < fjObject.matchCount; i++) {
                    tempInputArray.push(i);
                }
                setInputArray(tempInputArray);
            }
            setPageLoaded(true);
        }
    }, [inputArray,fjObject,pageLoaded]);

    useEffect(() => {
        if(state.clockTime <= 100) {
            // console.log("Time expired!");
            // console.log(formState);
            dispatch({
                type: STORE_ANSWERS,
                storedAnswers: Object.values(formState)
            })
        }
    }, [state.clockTime, formState,dispatch]);

    const handleFormChange = returnedObject => {
        //If this is the first change in any of the inputs
        if(!formState.hasOwnProperty('input0')) {
            const inputEls = document.getElementsByTagName('input');
            const newFormState = {};
            for(let i = 0; i < inputEls.length; i++) {
                newFormState[`input${i}`] = inputEls[i].value;
            }
            setFormState(newFormState);
            //console.log(newFormState);
        } else {
            const { name, value } = returnedObject;
            const newFormState = { ...formState, [name]: value };
            setFormState(newFormState);
            //console.log(newFormState);
        }
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        const answerArr = Object.values(formState);
        console.log("Answers Submitted!");
        console.log(answerArr);
        onAnswerSubmit(answerArr);
    }

    
    return (
        <form className='flex-column align-items-center margin-bottom-tiny'>
            <h2>{fjObject.gameDate.toDateString().substring(4)}</h2>
            <h2>{fjObject.clue}</h2>
            {
                inputArray.map(val => {
                    return <AnswerBox key={val} handleFormChange={handleFormChange} responseNumber={val} autoFillOptions={fjObject.responseList} isPerson={fjObject.isPerson} />
                })
            }
            <button className='btn btn-primary' type='submit' onClick={handleFormSubmit}>Submit Answer{inputArray.length > 1 ? "s" : ""}!</button>
        </form>
    )
}

export default ResponseForm