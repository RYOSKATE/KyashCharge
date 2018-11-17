import * as React from 'react';
import './css/App.css';

import Calc from './Calc';

class App extends React.Component {
    public render() {
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Kyash Charge
          </h1>
        </header>
        <Calc/>
      </div>
    );
  }
}

export default App;
