import React, { useMemo, useState, useEffect } from "react";
import Cage from "./Cage.jsx";
import generateCages from "../utils/generateCages.js";
import updateCages from "../utils/updateCages.js";
import generateArray from "../utils/generateArray.js";

function Space({ started, stop }) {
  let [cages, setCages] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  let [interval, setIntervalState] = useState(null);

  const passiveData = {
    rows: 35,
    columns: 35,
    intervalDelay: 100,
  };

  useEffect(() => {
    setRows(generateArray(passiveData.rows));
    setColumns(generateArray(passiveData.columns));
    setCages(generateCages(passiveData.rows, passiveData.columns));
  }, []);

  const update = () => {
    setCages(updateCages(cages));
  };
  
  const selectItem = (index) => {
    setCages(
      cages.map((item, index1) => {
        if (index1 === index) {
          item.alive = !item.alive;
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
      setIntervalState(
        setInterval(() => {
          tick();
        }, passiveData.intervalDelay)
      );
    } else {
      clearInterval(interval);
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

export default Space;