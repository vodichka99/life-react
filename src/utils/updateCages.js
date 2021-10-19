function updateCages(cages) {
  return cages.map((cage) => {
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
}

export default updateCages