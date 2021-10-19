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
    let topRow = rowIndex
      ? rows * (rowIndex - 1)
      : rows * (rows - 1);
    let centerRow = rows * rowIndex;
    let bottomRow =
      rowIndex !== rows - 1 ? rows * (rowIndex + 1) : 0;
    let leftColumn = colIndex ? colIndex - 1 : columns - 1;
    let centerColumn = colIndex;
    let rightColumn = colIndex !== columns - 1 ? colIndex + 1 : 0;

    let leftTop = topRow + leftColumn;
    let top = topRow + centerColumn;
    let rightTop = topRow + rightColumn;
    let left = centerRow + leftColumn;
    let right = centerRow + rightColumn;
    let leftBottom = bottomRow + leftColumn;
    let bottom = bottomRow + centerColumn;
    let rightBottom = bottomRow + rightColumn;

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
    cage.around = aroundCages;
  });
  return newCages
}

export default generateCages