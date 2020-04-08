import React from 'react'

function ItemList({items}) {
  return items.length ? (
    <ul>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  ) : (
    <span>
      <div>no items</div>
    </span>
  )
}

export default ItemList
