import { createStore } from 'redux';
import reducer from './reducer';
import { MAY_16_2014 } from '../RealQuestions';

const initialState = {
    playerName: "",
    questionObject: MAY_16_2014,
    gameMode: null,
    gamePlayers: null,
    autoCompleteList: MAY_16_2014.responseList,
    clockTime: null,
    answerSubmitted: false,
    storedAnswers: null
}

const store = createStore(reducer, initialState);

export default store;