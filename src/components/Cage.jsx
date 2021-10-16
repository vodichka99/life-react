import React, { useMemo } from "react";

function Cage({ item, selectItem, index }) {
  const classes = useMemo(() => item.alive ? "cage alive" : "cage", [item.alive], [item]);
  return (
    <div className={classes} onClick={() => selectItem(index)} />
  );
}

export default Cage;
