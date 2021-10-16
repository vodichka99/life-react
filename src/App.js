import React, { useState, useMemo } from 'react';
import Space from './components/Space.jsx';


function App() {
  const [started, setStarted] = useState(false)

  const start = () => {
    setStarted(true)
  }
  const stop = () => {
    setStarted(false)
  }
  return (
    <div className="App">
      <h3 className="name pointer" >
        LIFE
      </h3>
      <div className="container">
        <Space started={started} stop={stop} />
        <div className="buttons">
          <button className="play pointer" disabled={started ? true : false} onClick={start} >
            Play
          </button>
          <button className="play pointer" onClick={stop} >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
