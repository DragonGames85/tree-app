import React, { useState } from "react";

export const Input = ({ children, value, addChildren, deleteNode }) => {
  const [state, setState] = useState(`${value}`);

  return (
    <div>
      <input value={state} onChange={e => setState(e.target.value)} />
      <button onClick={addChildren}>+</button>
      <button onClick={deleteNode}>-</button>
      {children && <div style={{ marginLeft: "20px" }}>{children}</div>}
    </div>
  );
};
