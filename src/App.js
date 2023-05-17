import React, { useState } from "react";
import "./App.css";
import { Input } from "./Input";
import { removeNode, updateTree } from "./helpers";

function App() {
  const [tree, setTree] = useState([]);
  const [counter, setCounter] = useState(0);

  const addNode = () => {
    setTree(currTree => [
      ...currTree,
      <Input
        addChildren={() => addChildren(counter)}
        deleteNode={() => deleteNode(counter)}
        value={"Node " + counter}
        key={counter}
      />,
    ]);
    setCounter(prev => prev + 1);
  };

  const addChildren = key => {
    setCounter(currCounter => {
      setTree(currTree =>
        updateTree(
          currTree,
          key,
          <Input
            key={currCounter}
            value={"Node " + currCounter}
            addChildren={() => addChildren(currCounter)}
            deleteNode={() => deleteNode(currCounter)}
          />
        )
      );
      return currCounter + 1;
    });
  };

  const deleteNode = key => {
    setTree(prevTree => {
      return removeNode(prevTree, key);
    });
  };

  const clearTree = () => {
    setTree([]);
    setCounter(0);
  };

  return (
    <div className="App">
      {tree.map(i => i)}
      <div style={{ marginTop: "auto" }}>
        <button onClick={addNode}>ДОБАВИТЬ</button>
        <button onClick={clearTree}>ОЧИСТИТЬ</button>
      </div>
    </div>
  );
}

export default App;
