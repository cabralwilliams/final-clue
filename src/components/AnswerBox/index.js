import React, { useState } from 'react';
import { searchMatches } from '../../utils/Data';

function AnswerBox({ handleFormChange, responseNumber, autoFillOptions, isPerson }) {
    const [answerVal,setAnswerVal] = useState('');

    //Convert supplied answers to a set and back to array to eliminate duplicate answers
    const autoFillSet = Array.from(new Set(autoFillOptions));
    //flex-column align-items-center margin-bottom-tiny
    //
    const handleInputChange = event => {
        event.preventDefault();
        const newAnswerVal = document.querySelector(`#input${responseNumber}`).value.trim()
        setAnswerVal(newAnswerVal);
        const toSearch = new RegExp(answerVal, 'i');
        const matchedVals = searchMatches(toSearch,autoFillSet);
        const datalist = document.querySelector(`#matchedValues${responseNumber}`);
        datalist.innerHTML = "";
        for(let i = 0; i < matchedVals.length; i++) {
            let nextEl = document.createElement('option');
            nextEl.value = matchedVals[i];
            datalist.append(nextEl);
        }
        handleFormChange({ name: `input${responseNumber}`, value: newAnswerVal });
    }
    return (
        <div className='form-group'>
            <label htmlFor={`input${responseNumber}`} className='margin-bottom-tiny'>{isPerson ? "Who is" : "What is"}</label>
            <input id={`input${responseNumber}`} name={`input${responseNumber}`} list={`matchedValues${responseNumber}`} onChange={handleInputChange} className='form-control margin-bottom-tiny' />
            <datalist id={`matchedValues${responseNumber}`}></datalist>
        </div>
    );
}

export default AnswerBox;