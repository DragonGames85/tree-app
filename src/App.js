import React, { useState } from "react";
import "./App.css";
import { Input } from "./Input";
import { removeNode, updateTree, showSelect, setEdit } from "./helpers";

function App() {
  const [tree, setTree] = useState([]);
  const [counter, setCounter] = useState(0);
  const [selectedKey, setSelectedKey] = useState(-1);

  const select = key => {
    setSelectedKey(key);
    setTree(prevTree => showSelect(prevTree, key));
  };

  const addNode = () => {
    setTree(currTree => [
      ...currTree,
      <Input
        edit={false}
        selected={false}
        showSelected={() => select(counter)}
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
            edit={false}
            selected={false}
            showSelected={() => select(currCounter)}
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

  const editNode = () => {
    setTree(prevTree => {
      return setEdit(prevTree, selectedKey);
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
        <button onClick={editNode}>РЕДАКТИРОВАТЬ</button>
      </div>
    </div>
  );
}

export default App;
