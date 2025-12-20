import React from 'react';
import Router from './router/Router';

const App = () => {

  return (
    <>
      <div className="page-wrapper relative w-full" id="page-wrapper">

        <main className="page-main" id="page-main">
          <Router />
        </main>

      </div>
    </>
  )
}

export default App;