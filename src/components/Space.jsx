import React, { useMemo, useState, useEffect } from "react";
import Cage from "./Cage.jsx";

function Space({ started, stop }) {
  let [cages, setCages] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  let [interval, setIntervalState] = useState(null);

  const passiveData = {
    rows: 30,
    columns: 30,
    intervalDelay: 100,
  };
  useEffect(() => {
    const r = [];
    const c = [];
    const newCages = [];
    for (let i = 0; i < passiveData.rows; i++) {
      r.push(i);
    }
    for (let i = 0; i < passiveData.columns; i++) {
      c.push(i);
    }
    setRows(r);
    setColumns(c);
    for (let i = 1; i <= passiveData.rows; i++) {
      for (let i1 = 1; i1 <= passiveData.columns; i1++) {
        newCages.push({ row: i, col: i1, alive: false, willLive: false });
      }
    }
    function countCagesDependency(arr) {
      arr.forEach((cage) => {
        const rowIndex = cage.row - 1;
        const colIndex = cage.col - 1;
        let leftTop =
          colIndex != 0 ? passiveData.rows * (rowIndex - 1) + colIndex - 1 : -1;
        let top = passiveData.rows * (rowIndex - 1) + colIndex;
        let rightTop =
          colIndex != passiveData.columns - 1
            ? passiveData.rows * (rowIndex - 1) + colIndex + 1
            : -1;
        let left = colIndex != 0 ? passiveData.rows * rowIndex + colIndex - 1 : -1;
        let right =
          colIndex != passiveData.columns - 1
            ? passiveData.rows * rowIndex + colIndex + 1
            : -1;
        let leftBottom =
          colIndex != 0 ? passiveData.rows * (rowIndex + 1) + colIndex - 1 : -1;
        let bottom = passiveData.rows * (rowIndex + 1) + colIndex;
        let rightBottom =
          colIndex != passiveData.columns - 1
            ? passiveData.rows * (rowIndex + 1) + colIndex + 1
            : -1;
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
          if (item >= 0 && item <= arr.length - 1) around.push(item);
        });
        cage.around = around;
      });
    }
    countCagesDependency(newCages)
    setCages(newCages);
  }, []);
  
  
  

  const update = () => {
    setCages(
      cages.map((cage) => {
        let aliveCagesAround = 0;
        cage.around.forEach((item) => {
          if (cages[item].alive) {
            aliveCagesAround += 1;
          }
        });
        if (cage.alive) {
          if (aliveCagesAround < 2 || aliveCagesAround > 3)
            cage.willLive = false;
          else if (aliveCagesAround === 2 || aliveCagesAround === 3)
            cage.willLive = true;
        } else {
          if (aliveCagesAround === 3) cage.willLive = true;
          else cage.willLive = false;
        }
        return cage;
      })
    );
  };
  const selectItem = (index) => {
    setCages(
      cages.map((item, index1) => {
        if (index1 === index) {
          console.log(item);
          item.alive = true;
        }
        return item;
      })
    );
    update();
  };
  const tick = () => {
    let aliveCages = 0;
    setCages(
      cages.map((cage) => {
        if (cage.willLive) {
          cage.alive = true;
          aliveCages += 1;
        } else cage.alive = false;
        return cage;
      })
    );
    if (!aliveCages) stop();
    update();
  };

  useEffect(() => {
    if (started) {
      setIntervalState(setInterval(() => {
        tick();
      }, passiveData.intervalDelay))
    } else {
      clearInterval(interval)
    }
  }, [started]);

  const lifeWrapperClasses = useMemo(
    () => (started ? "life-wrapper" : "life-wrapper pointer"),
    [started]
  );

  return (
    <div className={lifeWrapperClasses}>
      {rows.map((num) => {
        return (
          <div className="row" key={num}>
            {columns.map((num1) => {
              return (
                <Cage
                  key={num1}
                  selectItem={selectItem}
                  index={num1 + columns.length * num}
                  item={cages[num1 + columns.length * num]}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(Space);
