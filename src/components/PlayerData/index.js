import React from 'react'

function PlayerData({ playerObject }) {
    return (
        <div className='card col-4'>
            <div className='card-body'>
                <h3 className='card-title'>{playerObject.name}</h3>
                <h4>Player Statistics</h4>
                <ul>
                    <li>Victories: {playerObject.victories}</li>
                    <li>Run: {playerObject.runDates}</li>
                    <li>Winnings: {playerObject.winnings}</li>
                    <li>Notes: {playerObject.notes}</li>
                </ul>
            </div>
        </div>
    )
}

export default PlayerData;