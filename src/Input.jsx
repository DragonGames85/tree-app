import React, { useState } from "react";

export const Input = ({
  children,
  value,
  addChildren,
  deleteNode,
  showSelected,
  selected,
  edit,
}) => {
  const [state, setState] = useState(`${value}`);

  return (
    <div>
      {edit ? (
        <input
          value={state}
          onChange={e => setState(e.target.value)}
        />
      ) : (
        <span
          onClick={showSelected}
          style={{ background: selected ? "red" : "inherit" }}
        >
          {state}
        </span>
      )}
      <button onClick={addChildren}>+</button>
      <button onClick={deleteNode}>-</button>
      {children && <div style={{ marginLeft: "20px" }}>{children}</div>}
    </div>
  );
};
