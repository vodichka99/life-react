import React from 'react';


function cage({item, selectItem, index}) {
  const classes = ['cage']
  if (item.alive) {
    classes.push('alive')
  }
  
  return <div className={classes.join(' ')} onClick={() => selectItem(index)}/>
}

export default cage