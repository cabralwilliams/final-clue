import { SELECT_PLAYERS, SELECT_QUESTION, INITIALIZE_GAME, SET_CLOCK_TIME, STORE_ANSWERS, SUBMIT_ANSWERS } from "./actions";

const reducer = (state, action) => {
    switch(action.type) {
        case INITIALIZE_GAME:
            return { 
                playerName: action.playerName,
                questionObject: action.questionObject,
                gameMode: action.gameMode,
                gamePlayers: action.gamePlayers,
                autoCompleteList: action.autoCompleteList
            }
        case SELECT_QUESTION:
            return {
                ...state,
                questionObject: action.questionObject,
                autoCompleteList: action.autoCompleteList
            }
        case SELECT_PLAYERS:
            return {
                ...state,
                gamePlayers: action.gamePlayers
            }
        case SET_CLOCK_TIME:
            return {
                ...state,
                clockTime: action.clockTime
            }
        case STORE_ANSWERS:
            return {
                ...state,
                storedAnswers: action.storedAnswers
            }
        default:
            return state;
    }
}

export default reducer;