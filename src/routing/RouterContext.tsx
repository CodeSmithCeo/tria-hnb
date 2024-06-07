import React, { createContext, useContext } from 'react';

type RouterContext = {
  [key: string]: string | null;
}

const RouterContext = createContext<RouterContext>({});

export const useUrlParams = () => useContext(RouterContext);

const RouterContextProvider: React.FC<RouterContext> = ({ children, ...params }) => {
  return (
    <RouterContext.Provider value={params}>
        {children}
    </RouterContext.Provider>
  );
};

export default RouterContextProvider;
export {RouterContext}
