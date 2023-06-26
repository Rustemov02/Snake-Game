import React, { useState } from "react";

const Menu = ({ onRouteChange }) => {

  const [value , setValue] = useState('')
  const link = 'https://github.com/Rustemov02?tab=repositories'
  return (
    <div className="wrapper">
      <input type="text" placeholder="username" value={value} onChange={(e)=>setValue(e.target.value)}/>
      <input
        onClick={() => onRouteChange(value)}
        className="start"
        type="button"
        value="Start Game"
      />
      <input type="button" className="start" value='Check out my other games' onClick={()=>window.location.href = link}/>
    </div>
  );
};

export default Menu;
