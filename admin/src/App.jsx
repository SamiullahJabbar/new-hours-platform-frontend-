import React from 'react';
import Sidebar from './components/Sidebar';
import Router from './router/Router';

const App = () => {

  return (
    <div className="page-wrapper">
      <div className="flex flex-wrap w-full">
        <div className="sidebar hidden md:block w-1/2 md:w-1/5 fixed top-0 left-0 bg-white rounded-r-2xl h-screen overflow-y-auto">
          <Sidebar />
        </div>
        <div className="main-content w-full md:w-4/5 md:ml-[20%]">
          <div className="wrapper p-3">
            <Router />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;