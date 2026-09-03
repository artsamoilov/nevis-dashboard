import {
  type IRawNode,
  type ITreeNode,
  NODE_TYPE,
  type TNodeType,
} from "../types/company.ts";

export const normalizeTree = (
  node: IRawNode,
  nodeType: TNodeType = NODE_TYPE.COMPANY,
): ITreeNode => {
  const base = {
    id: node.id,
    name: node.name,
    values: node.values,
    variant: nodeType,
  };

  if (node.branches?.length) {
    return {
      ...base,
      children: node.branches.map((child) =>
        normalizeTree(child, NODE_TYPE.BRANCH),
      ),
    };
  }

  if (node.employees?.length) {
    return {
      ...base,
      children: node.employees.map((child) =>
        normalizeTree(child, NODE_TYPE.EMPLOYEE),
      ),
    };
  }

  if (node.channels?.length) {
    return {
      ...base,
      children: node.channels.map((child) =>
        normalizeTree(child, NODE_TYPE.CHANNEL),
      ),
    };
  }

  return base;
};
