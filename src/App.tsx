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
        <div>
          100円単位でポイントが付くクレジットカードを使用している場合、
          Kyashにいくら送金キャンセル手動チャージすると端数がなくなるか計算するアプリ
        </div>
      </div>
    );
  }
}

export default App;
