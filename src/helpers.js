import { cloneElement } from "react";

const findNode = (tree, key, callback) => {
  return tree.map(node => {
    if (node && +node.key === key) {
      return callback(node);
    } else if (node && node.props.children) {
      return cloneElement(node, {
        selected: false,
        edit: false,
        children: findNode(node.props.children, key, callback),
      });
    }
    return node ? cloneElement(node, { selected: false, edit: false }) : null;
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

export const showSelect = (tree, key) => {
  const selectedNode = node =>
    cloneElement(node, {
      selected: true,
      children: node.props.children
        ? findNode(node.props.children, key, () => {})
        : node.props.children,
    });
  return findNode(tree, key, selectedNode);
};

export const setEdit = (tree, key) => {
  const selectedNode = node =>
    cloneElement(node, {
      edit: true,
      selected: false,
      children: node.props.children
        ? findNode(node.props.children, key, () => {})
        : node.props.children,
    });
  return findNode(tree, key, selectedNode);
};
