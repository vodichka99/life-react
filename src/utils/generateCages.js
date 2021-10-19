function generateCages(rows, columns) {
  const newCages = [];
  for (let i = 1; i <= rows; i++) {
    for (let i1 = 1; i1 <= columns; i1++) {
      newCages.push({ row: i, col: i1, alive: false, willLive: false });
    }
  }
  newCages.forEach((cage) => {
    const rowIndex = cage.row - 1;
    const colIndex = cage.col - 1;
    let leftTop =
      colIndex != 0 ? rows * (rowIndex - 1) + colIndex - 1 : -1;
    let top = rows * (rowIndex - 1) + colIndex;
    let rightTop =
      colIndex != columns - 1
        ? rows * (rowIndex - 1) + colIndex + 1
        : -1;
    let left =
      colIndex != 0 ? rows * rowIndex + colIndex - 1 : -1;
    let right =
      colIndex != columns - 1
        ? rows * rowIndex + colIndex + 1
        : -1;
    let leftBottom =
      colIndex != 0 ? rows * (rowIndex + 1) + colIndex - 1 : -1;
    let bottom = rows * (rowIndex + 1) + colIndex;
    let rightBottom =
      colIndex != columns - 1
        ? rows * (rowIndex + 1) + colIndex + 1
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
      if (item >= 0 && item <= newCages.length - 1) around.push(item);
    });
    cage.around = around;
  });
  return newCages
}

export default generateCages