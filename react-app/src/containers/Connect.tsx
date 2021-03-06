import React, { FC, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import regeneratorRuntime from "regenerator-runtime";


const Connect = props => {

  let history = useHistory();

  const connectHandler = (event) => {
    event.preventDefault();
    
    const username = document.getElementById('userName');
    const password = document.getElementById('userPassword');
    const broker = document.getElementById('broker');
    

    fetch('/connectKafka', {
      method: 'POST',
      headers: {'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username.value, 'password': password.value, 'broker': broker.value}),
    })
      .then(response => response.json())
      .then(data => {
        if(data.connected === true){
          props.connectedHandler();
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    return;
  }


  return (
    <div>
      <div className="header">
          <img className="logo" src='https://i.imgur.com/dso31sS.png'/>
      </div>
      <div className="login-wrapper">
        <form action="login" method="post" id="loginForm">
          <div className="broker">
        <label htmlFor="userName">USERNAME</label>
        <input type="text" id="userName" name="userName" />
      </div>
      <div className="broker">
        <label htmlFor="userPassword">PASSWORD</label>
        <input type="password" id="userPassword" name="userPassword"/>
      </div>
      <div className="broker">
        <label htmlFor="broker">BROKER</label>
        <input type="broker" id="broker" name="broker" required/>
      </div>
      <div id="form-Buttons">
      </div>
      <div id="form-button">
      <button type="submit" onClick={connectHandler}>Connect</button>
      </div>
    </form>
    </div>
    </div>
  
)

}



export default Connect;