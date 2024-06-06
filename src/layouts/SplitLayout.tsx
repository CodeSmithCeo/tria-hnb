import React from 'react';
import { ReactNode } from 'react';
import './SplitLayout.css';

type SplitLayout = (
  {children}: {children: [ReactNode, ReactNode]}
) => JSX.Element;

const SplitLayout: SplitLayout = ({children}) => {
  
  const [leftChild, rightChild]= children;
  return (
        <div className="split-layout">
            <div className="split-layout __part --left">
                {leftChild}
            </div>
            <div className="split-layout __part --right">
                {rightChild}
            </div>
        </div>
    );
};

export default SplitLayout;