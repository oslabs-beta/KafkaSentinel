import React, { FC, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import regeneratorRuntime from "regenerator-runtime";


const Connect = props => {

  let history = useHistory();

  const connectHandler = (event) => {
    event.preventDefault();
    // console.log('username: ', event.target);
    const username = document.getElementById('userName');
    const password = document.getElementById('userPassword');
    const broker = document.getElementById('broker');
    // let loginSuccess = false;
    // props.connectedHandler();
    //       history.push('/');

    console.log("username", username.value);
    console.log("password", password.value);
    console.log("broker", broker.value);

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
    <div className="login-wrapper">
      <div id='formHeader'><h1>KafkaSentinel</h1></div>  
      <div>
        <form action="login" method="post" id="loginForm">
          <div>
        <label htmlFor="userName">USERNAME</label>
        <input type="text" id="userName" name="userName" />
      </div>
      <div>
        <label htmlFor="userPassword">PASSWORD</label>
        <input type="password" id="userPassword" name="userPassword"/>
      </div>
      <div>
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
  // <div>
  //   <h1> Login Test {username}</h1> 
  //   <button onClick={() =>  {history.push('/user')}}>User</button>
  // </div>
)

}



export default Connect;