import React, { useState, useEffect } from 'react';
import AnswerBox from '../AnswerBox';
import { 
    MAY_16_2014
} from '../../utils/RealQuestions';

function ResponseForm({ fjClueObject }) {
    const [formState, setFormState] = useState({});
    const [pageLoaded,setPageLoaded] = useState(false);
    const [fjObject,setFJObject] = useState(fjClueObject);
    const [inputArray,setInputArray] = useState([]);

    useEffect(() => {
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

    const handleFormChange = returnedObject => {
        //If this is the first change in any of the inputs
        if(!formState.hasOwnProperty('input0')) {
            const inputEls = document.getElementsByTagName('input');
            const newFormState = {};
            for(let i = 0; i < inputEls.length; i++) {
                newFormState[`input${i}`] = inputEls[i].value;
            }
            setFormState(newFormState);
            console.log(newFormState);
        } else {
            const { name, value } = returnedObject;
            const newFormState = { ...formState, [name]: value };
            setFormState(newFormState);
            console.log(newFormState);
        }
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
            <button className='btn btn-primary' type='submit'>Submit Answer{inputArray.length > 1 ? "s" : ""}!</button>
        </form>
    )
}

export default ResponseForm