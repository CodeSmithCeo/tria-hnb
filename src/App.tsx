import React from 'react';
import './App.css';
import useUrlChange from 'hooks/useUrlChange';
import Router from 'routing/Router';

function App() {

  // use browser url
  const currentUrl = useUrlChange();

  return (
    <div className="App">
      {currentUrl.path}
      <Router />
    </div>
  );
}

export default App;
