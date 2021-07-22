import React, { FC, useState, useEffect } from 'react';
import MainContainer from './containers/MainContainer'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Connect from './containers/Connect'
// import './app.scss';

const App = props => {
  const [connected, setConnected] = useState(false);
  const connectedHandler = () => {
    setConnected(true);
  }

  useEffect(() => {
    console.log("in useEffect line 14 of app.tsx")
    // fetch request to cookie controller to check current cookie values 
    fetch('/checkCookie')
      .then(response => response.json())
      .then(data => {
        // console.log("hello")
        if(data.connected === true){
          connectedHandler();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  })

  if(connected == true) {
    console.log("hello from line 29 in app.tsx")
    // const ioSocket = require('socket.io')(5000, {
    //   cors: {
    //     origin: '*',
    //     // origin: ['http://localhost:5000'],
    //     credentials: true
    //   }
    // });

    // ioSocket.on('connection', socket => {
    //   console.log(socket.id)

    //   socket.on("disconnect", () => {
    //     console.log(`Client ${socket.id} disconnected`);
    //   });
    // });

    fetch('/checkCookie')
      .then(response => response.json())
      .then(data => {
        // console.log("hello")
        if(data.connected === true){
          connectedHandler();
        }
      })
      .catch((err) => {
        console.log(err);
      })


  }

  return(
    <Router>
        {connected ? <Redirect to= '/' /> : <Redirect to="/connect" />}
      <Switch>
        <Route exact path="/connect" component={() => <Connect connectedHandler={connectedHandler}/>}/>
        <Route exact path="/" component={MainContainer}/>
      </Switch>

    </Router>
  )
}



// const App = props => {

//   return(
//     <div>
//      <MainContainer/>
//     </div>
//   )
// }











// interface AppProps {
//   initialCount?: number;
// }

// interface AppState {
//   counter: number;
// }

// export class App extends React.Component<AppProps, AppState> {
//   constructor(props: AppProps) {
//     super(props);

//     this.state = {
//       counter: props.initialCount || 0,
//     };

//     this.increment = this.increment.bind(this);
//   }

//   increment() {
//     this.setState((prevState) => ({
//       ...prevState,
//       counter: prevState.counter + 1,
//     }));
//   }

//   render() {
//     return (
//       <div className='app'>
//         <h1>My App</h1>
//         <p>{`Initial count: ${this.props.initialCount || 0}`}</p>
//         <button
//           onClick={this.increment}
//         >{`You clicked me ${this.state.counter} times`}</button>
//       </div>
//     );
//   }
// }

// export const App: FC<AppProps> = ({ initialCount }) => {
//   const [counter, setCounter] = useState(initialCount || 0);

//   return (
//     <div className='app'>
//       <h1>My App</h1>
//       <p>{`Initial count: ${initialCount || 0}`}</p>
//       <button onClick={() => setCounter((prevCounter) => prevCounter + 1)}>
//         {`You clicked me ${counter} times`}
//       </button>
//     </div>
//   );
// };
export default App;