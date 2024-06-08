import React from 'react';
import { ReactNode } from 'react';
import './SplitLayout.css';

type Layout = (
  {children}: {children: [ReactNode, ReactNode]}
) => JSX.Element;

const SplitLayout: Layout = ({children}) => {
  
  const [leftChild, rightChild]= children;
  return (
        <div className="split-layout">
            <div className="split-layout__part split-layout__part--left">
                {leftChild}
            </div>
            <div className="split-layout__part split-layout__part--right">
                {rightChild}
            </div>
        </div>
    );
};

export default SplitLayout;