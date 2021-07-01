import React, { FC, useState } from 'react';
import './app.scss';

interface AppProps {
  initialCount?: number;
}

interface AppState {
  counter: number;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      counter: props.initialCount || 0,
    };

    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState((prevState) => ({
      ...prevState,
      counter: prevState.counter + 1,
    }));
  }

  render() {
    return (
      <div className='app'>
        <h1>My App</h1>
        <p>{`Initial count: ${this.props.initialCount || 0}`}</p>
        <button
          onClick={this.increment}
        >{`You clicked me ${this.state.counter} times`}</button>
      </div>
    );
  }
}

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
