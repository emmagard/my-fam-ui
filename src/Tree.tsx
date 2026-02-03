import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./features/global-context";
import TreeNode from "./TreeNode";
import type { Individual } from './types';

const Tree = ({data}:{data: Individual[]}) => {
  if (!data) {
    return null;
  }
  
  return (
    <ul>
      {data.map((node) => {
        
          return (
            <TreeNode key={`${node?.name}-${node?.id}`} node={node} />
          );
      })}
    </ul>
  );
}

export default Tree;