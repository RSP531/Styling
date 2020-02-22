import React from 'react';

function GroceryItem(props) {
  if(props.oneItem==='jerky'){
    return (
      <li>
        {props.oneItem} can never be deleted from your list
      </li>
    )
  }
    return(
      <>
        <li>{props.oneItem}</li>
        <button value={props.indexValue} onClick={props.deleteItem}>Delete Item</button>
      </>
    )
}

export default GroceryItem;