import './App.css';
import React, { useState } from 'react';
import Cage from './life_components/cage';




function App() {
  const [started, setStarted] = useState(false)
  let [cages, setCages] = useState([])
  const rows = []
  const columns = []

  const passiveData = {
    rows: 30,
    columns: 30,
    intervalDelay: 100,
    interval: null,
  }
  const find = (params) => {
    return cages.find((item) => {
      return item.row == params.row && item.col == params.col;
    });
  };
  for (let i = 0; i < passiveData.rows; i++) {
    rows.push(i)
  }
  for (let i = 0; i < passiveData.columns; i++) {
    columns.push(i)
  }
  if (!cages.length) {
    for (let i = 1; i <= passiveData.rows; i++) {
      for (let i1 = 1; i1 <= passiveData.columns; i1++) {
        cages.push({ row: i, col: i1, alive: false, willLive: false });
      }
    }
  }

  const lifeWrapperClasses = ['life-wrapper']
  if (!started) {
    lifeWrapperClasses.push('pointer')
  }

  

  const update = () => {
    setCages(cages.map((cage) => {
      let aliveCagesAround = 0;
      cage.around.forEach((item) => {
        if (cages[item].alive) {
          aliveCagesAround += 1;
        }
      });
      if (cage.alive) {
        if (aliveCagesAround < 2 || aliveCagesAround > 3)
          cage.willLive = false;
        else if (aliveCagesAround == 2 || aliveCagesAround == 3)
          cage.willLive = true;
      } else {
        if (aliveCagesAround == 3) cage.willLive = true;
        else cage.willLive = false;
      }
      return cage
    }))
  }
  const selectItem = (index) => {
    setCages(cages.map((item, index1) => {
      if (index1 == index) item.alive = true
      return item
    }))
    update()
  }
  const tick = () => {
    let aliveCages = 0
    setCages(cages.map((cage) => {
      if (cage.willLive) {
        cage.alive = true
        aliveCages += 1
      }
      else cage.alive = false;
      return cage
    }))
    if (!aliveCages) stop()
    update();
  }
  cages.forEach((cage) => {
    let leftTop = find({ row: cage.row - 1, col: cage.col - 1 });
    let top = find({ row: cage.row - 1, col: cage.col });
    let rightTop = find({ row: cage.row - 1, col: cage.col + 1 });
    let left = find({ row: cage.row, col: cage.col - 1 });
    let right = find({ row: cage.row, col: cage.col + 1 });
    let leftBottom = find({ row: cage.row + 1, col: cage.col - 1 });
    let bottom = find({ row: cage.row + 1, col: cage.col });
    let rightBottom = find({ row: cage.row + 1, col: cage.col + 1 });
    const aroundCages = [
      leftTop,
      top,
      rightTop,
      left,
      right,
      leftBottom,
      bottom,
      rightBottom,
    ];
    const around = [];
    aroundCages.forEach((item) => {
      if (item) around.push(cages.indexOf(item));
    });
    cage.around = around;
  });
  
  const start = () => {
    setStarted(true)
    passiveData.interval = setInterval(() => {
      tick()
    }, passiveData.intervalDelay);
  }
  const stop = () => {
    setStarted(false)
    clearInterval(passiveData.intervalDelay)
  }
  
  return (
    <div className="App">
      <a className="name pointer" >
        LIFE
      </a>
      <div className="container">
        <div className={lifeWrapperClasses.join(' ')}>
          {rows.map(num => {
            return <div className="row" key={num}>{columns.map(num1 => {
              return <Cage key={num1}
                selectItem={selectItem}
                index={num1 + passiveData.columns * (num)}
                item={cages[num1 + passiveData.columns * (num)]} />
            })}</div>
          })}
        </div>
        <div className="buttons">
          <button className="play pointer" disabled={started ? true : false} onClick={() => start()} >
            Play
          </button>
          <button className="play pointer" onClick={() => stop()} >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
