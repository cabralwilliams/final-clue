import { formatDate, formatDollars } from "../Format";

export class ComputerPlayer {
    constructor(name, startingScore, wager, doublePlayerScores = false, correctProbability = 0.5) {
        this.name = name;
        this.startingScore = startingScore;
        this.wager = wager;
        this.doublePlayerScores = doublePlayerScores;
        this.correctProbability = correctProbability;
    }

    setResponse(correctResponse, answerArray) {
        const correct = Math.random() < this.correctProbability;
        if(correct) {
            return correctResponse;
        }
        let randomResponse = answerArray[Math.floor(Math.random()*answerArray.length)];
        while(randomResponse === correctResponse) {
            randomResponse = answerArray[Math.floor(Math.random()*answerArray.length)];
        }
        return randomResponse;
    }

    adjustScore(newScore = this.startingScore) {
        this.startingScore = newScore;
    }

    adjustWager(newWager = this.wager) {
        this.wager = newWager;
    }
}

export class RealPlayer extends ComputerPlayer {
    constructor(name, startingScore, wager, doublePlayerScores, correctProbability, response, wasCorrect) {
        super(name,startingScore,wager,doublePlayerScores,correctProbability);
        this.response = response;
        this.wasCorrect = wasCorrect;
        this.correctProbability = this.wasCorrect ? 1 : 0;
    }
}

export class PlayerStats {
    constructor(name, firstGame, lastGame, victories, winnings, notes, strategies) {
        //stratgies = { soloLead, tiedForLead, secondPlace, tiedForSecondPlace, thirdPlace }
        this.name = name;
        this.firstGame = firstGame;
        this.lastGame = lastGame;
        this.victories = victories;
        this.winningsRaw = winnings;
        this.notes = notes;
        this.winnings = formatDollars(this.winningsRaw);
        this.runDates = `${formatDate(new Date(this.firstGame))} - ${formatDate(new Date(this.lastGame))}`;
        this.strategies = strategies;
        this.startingScore = 0;
    }

    setStartingScore(inputAmount = 10000) {
        this.startingScore = inputAmount;
    }

    determineWager(opponentTotals) {
        //leadingTiedStrategy: options = aggressive, winBy1, tie, lose
        const isLeading = this.startingScore > opponentTotals[0] && this.startingScore > opponentTotals[1];
        let isSecond = false;
        let isLast = false;
        let isTiedForFirst = false;
        let isTiedForSecond = false;
        //Determine exact position for wager strategy and amount
        if(!isLeading) {
            isTiedForFirst = this.startingScore === opponentTotals[0] || this.startingScore === opponentTotals[1];
            if(!isTiedForFirst) {
                isSecond = (this.startingScore < opponentTotals[0] && this.startingScore > opponentTotals[1]) || (this.startingScore > opponentTotals[0] && this.startingScore < opponentTotals[1]);
                if(!isSecond) {
                    isTiedForFirst = this.startingScore === opponentTotals[0] || this.startingScore === opponentTotals[1];
                    if(!isTiedForSecond) {
                        isLast = true;
                    }
                }
            }
        }
    }
}

export class FinalRound {
    constructor(player1, player2, player3) {
        this.player1 = player1;
        this.player2 = player2;
        this.player3 = player3;
    }
}

//player = { buzzProbability, buzzSpeed, correctProbability1, correctProbability2, ddWagerPercent, wagerMax, score }
export function generatePlayerScores(player1, player2, player3) {
    function getRoundPoints(lowVal = 200) {
        const output = [];
        for(let i = 0; i < 6; i++) {
            const nextArr = [];
            for(let j = 1; j < 6; j++) {
                nextArr.push(j*lowVal);
            }
            output.push(nextArr);
        }
        return output;
    }

    const round1 = getRoundPoints();
    const round2 = getRoundPoints(400);
    //Place the daily doubles
    const dailyDoubles = {
        round1: [Math.floor(Math.random()*6),Math.floor(Math.random()*5)],
        round2_1: [Math.floor(Math.random()*6),Math.floor(Math.random()*5)],
        round2_2: [Math.floor(Math.random()*6),Math.floor(Math.random()*5)]
    }

    //Ensure that the daily doubles in the second round are in different locations
    while(dailyDoubles.round2_1[0] === dailyDoubles.round2_2[0]) {
        dailyDoubles.round2_2 = [Math.floor(Math.random()*6),Math.floor(Math.random()*5)];
    }

    function poseQuestion(p1,p2,p3, lastCorrect, roundNumber, questionsAsked = []) {
        const aOrder = [];
        //Determine the response order based on buzzSpeed property
        //First three outer conditions handle cases where there are no ties or if there is tie
        //between the second and third only
        //The next three account for when there is a two-way tie for fastest buzzSpeed
        if(p1.buzzSpeed > p2.buzzSpeed && p1.buzzSpeed > p2.buzzSpeed) {
            aOrder.push(p1);
            if(p2.buzzSpeed > p3.buzzSpeed) {
                aOrder.push(p2, p3);
            } else if(p3.buzzSpeed > p2.buzzSpeed) {
                aOrder.push(p3, p2);
            } else {
                if(Math.random() < 0.5) {
                    aOrder.push(p2, p3);
                } else {
                    aOrder.push(p3, p2);
                }
            }
        } else if(p2.buzzSpeed > p1.buzzSpeed && p2.buzzSpeed > p3.buzzSpeed) {
            aOrder.push(p2);
            if(p1.buzzSpeed > p3.buzzSpeed) {
                aOrder.push(p1, p3);
            } else if(p3.buzzSpeed > p1.buzzSpeed) {
                aOrder.push(p3, p1);
            } else {
                if(Math.random() < 0.5) {
                    aOrder.push(p1, p3);
                } else {
                    aOrder.push(p3, p1);
                }
            }
        } else if(p3.buzzSpeed > p1.buzzSpeed && p3.buzzSpeed > p2.buzzSpeed) {
            aOrder.push(p3);
            if(p2.buzzSpeed > p1.buzzSpeed) {
                aOrder.push(p2, p1);
            } else if(p1.buzzSpeed > p2.buzzSpeed) {
                aOrder.push(p1, p2);
            } else {
                if(Math.random() < 0.5) {
                    aOrder.push(p2, p1);
                } else {
                    aOrder.push(p1, p2);
                }
            }
        } else if(p1.buzzSpeed === p2.buzzSpeed && p1.buzzSpeed > p3.buzzSpeed) {
            if(Math.random() < 0.5) {
                aOrder.push(p1, p2, p3);
            } else {
                aOrder.push(p2, p1, p3);
            }
        } else if(p1.buzzSpeed === p3.buzzSpeed && p1.buzzSpeed > p2.buzzSpeed) {
            if(Math.random() < 0.5) {
                aOrder.push(p1, p3, p2);
            } else {
                aOrder.push(p3, p1, p2);
            }
        } else if(p2.buzzSpeed === p3.buzzSpeed && p2.buzzSpeed > p1.buzzSpeed) {
            if(Math.random() < 0.5) {
                aOrder.push(p2, p3, p1);
            } else {
                aOrder.push(p3, p2, p1);
            }
        } else {
            const randomVal = Math.random();
            if(randomVal < 1/6) {
                aOrder.push(p1, p2, p3);
            } else if(randomVal < 1/3) {
                aOrder.push(p1, p3, p2);
            } else if(randomVal < 1/2) {
                aOrder.push(p2, p1, p3);
            } else if(randomVal < 2/3) {
                aOrder.push(p2, p3, p1);
            } else if(randomVal < 5/6) {
                aOrder.push(p3, p1, p2);
            } else {
                aOrder.push(p3, p2, p1);
            }
        }
        let nextQuestion;
        //Initiate this to true to check wehther the question has already been asked
        let matchFound = true;
        while(matchFound) {
            let count = 0;
            nextQuestion = [Math.floor(Math.random()*6),Math.floor(Math.random()*5)];
            for(let i = 0; i < questionsAsked.length; i++) {
                if(nextQuestion[0] === questionsAsked[i][0] && nextQuestion[1] === questionsAsked[i][1]) {
                    count++;
                    break;
                }
            }
            if(count === 0) {
                matchFound = false;
                questionsAsked.push(nextQuestion);
            }
        }

        let correctlyAnswered = false;
        let questionVals = roundNumber === 1 ? round1 : round2;
        let isDailyDouble = false;
        //Determine whether the current question is a dailydouble
        if(roundNumber === 1) {
            if(dailyDoubles.round1[0] === nextQuestion[0] && dailyDoubles.round1[1] === nextQuestion[1]) {
                isDailyDouble = true;
            }
        } else {
            if(dailyDoubles.round2_1[0] === nextQuestion[0] && dailyDoubles.round2_1[1] === nextQuestion[1]) {
                isDailyDouble = true;
            }
            if(dailyDoubles.round2_2[0] === nextQuestion[0] && dailyDoubles.round2_2[1] === nextQuestion[1]) {
                isDailyDouble = true;
            }
        }
        let defaultMax = roundNumber === 1 ? 1000 : 2000;
        if(isDailyDouble) {
            let prob1 = Math.random();
            let didGetItCorrect = false;
            if(roundNumber === 1) {
                if(prob1 < lastCorrect.correctProbability1) {
                    didGetItCorrect = true;
                }
            } else {
                if(prob1 < lastCorrect.correctProbability2) {
                    didGetItCorrect = true;
                }
            }
            if(lastCorrect.score < defaultMax && lastCorrect.wagerMax) {
                lastCorrect.score += didGetItCorrect ? defaultMax : -defaultMax;
            } else {
                let wagerAmount = Math.floor(lastCorrect.score*lastCorrect.ddWagerPercent/100)*100;
                lastCorrect.score += didGetItCorrect ? wagerAmount : -wagerAmount;
            }
        } else {
            for(let i = 0; i < 3; i++) {
                //Two random values to check whether the player buzzed in and whether he/she answered correctly
                let prob1 = Math.random();
                let prob2 = Math.random();
                let correctProb = roundNumber === 1 ? aOrder[i].correctProbability1 : aOrder[i].correctProbability2;
                if(prob1 < aOrder[i].buzzProbability) {
                    if(prob2 < correctProb) {
                        //Answered correctly
                        correctlyAnswered = true;
                        aOrder[i].score += questionVals[nextQuestion[0]][nextQuestion[1]];
                    } else {
                        aOrder[i].score -= questionVals[nextQuestion[0]][nextQuestion[1]];
                    }
                }
                if(correctlyAnswered) {
                    return aOrder[i];
                }
            }
        }
        return lastCorrect;
    }
    const r1Qs = [];
    const r2Qs = [];
    let nextPlayer = player1;
    for(let i = 0; i < 30; i++) {
        nextPlayer = poseQuestion(player1,player2,player3, nextPlayer, 1, r1Qs);
    }
    if(player1.score <= player2.score && player1.score <= player3.score) {
        nextPlayer = player1;
    } else if(player2.score < player1.score && player2.score <= player3.score) {
        nextPlayer = player2;
    } else {
        nextPlayer = player3;
    }
    for(let i = 0; i < 30; i++) {
        nextPlayer = poseQuestion(player1,player2,player3, nextPlayer, 2, r2Qs);
    }
    return { player1, player2, player3 };
}

export function soloLeadBy1(playerScore, opponentScores, isRunaway = false) {
    if(!isRunaway) {
        const opponentDouble = 2*Math.max(...opponentScores);
        return opponentDouble - playerScore + 1;
    }
    return playerScore - 2*Math.max(...opponentScores) - 1;
}

export function soloLeadTie(playerScore, opponentScores, isRunaway = false) {
    if(!isRunaway) {
        const opponentDouble = 2*Math.max(...opponentScores);
        return opponentDouble - playerScore;
    }
    return playerScore - 2*Math.max(...opponentScores);
}

export function soloLeadCautious(playerScore, opponentScores, isRunaway = false) {
    if(!isRunaway) {
        //This strategy could lead to the leading player losing even if getting Final Jeopardy correct
        const opponentDouble = 2*Math.max(...opponentScores);
        return Math.floor((opponentDouble - playerScore)*(0.5*Math.random()/2)/100)*100;
    }
    return Math.floor((playerScore - 2*Math.max(...opponentScores))*(0.5*Math.random()/2)/100)*100;
}

export function soloLeadAggressive(playerScore, opponentScores, isRunaway = false) {
    if(!isRunaway) {
        const opponentDouble = 2*Math.max(...opponentScores);
        const difference = opponentDouble - playerScore; //Bare minimum to guarantee tie
        const buffer = playerScore - difference;
        return Math.floor((difference + buffer*Math.random())/100)*100;
    }
    const floor = playerScore - 2*Math.max(...opponentScores);
    return Math.floor((Math.floor((playerScore - floor)/100)*100 + floor)/100)*100;
}