import React from 'react'


export default function Score({score , username}){


    return(
        <div className='score'>
            <h2>User : {username}</h2>
            <h3>Score : {score}</h3>
            <button onClick={()=>window.location.reload()}>Restart</button>
        </div>
    )
}