import { createStore } from 'redux';
import reducer from './reducer';

const initialState = {
    playerName: "",
    questionObject: null,
    gameMode: null,
    gamePlayers: null,
    autoCompleteList: null,
    clockTime: null
}

const store = createStore(reducer, initialState);

export default store;