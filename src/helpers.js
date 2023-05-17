import { cloneElement } from "react";

const findNode = (tree, key, callback) => {
  return tree.map(node => {
    if (node && +node.key === key) {
      return callback(node);
    } else if (node && node.props.children) {
      return cloneElement(node, {
        children: findNode(node.props.children, key, callback),
      });
    }
    return node;
  });
};

export const removeNode = (tree, key) => {
  const removedNode = node => null;
  return findNode(tree, key, removedNode);
};

export const updateTree = (tree, key, input) => {
  const updatedNode = node =>
    cloneElement(node, {
      children: [...(node.props.children || []), input],
    });
  return findNode(tree, key, updatedNode);
};
