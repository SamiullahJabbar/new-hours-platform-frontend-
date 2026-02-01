import React from 'react';
import Router from './router/Router';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {

  return (
    <AuthProvider>
      <div className="page-wrapper relative w-full" id="page-wrapper">

        <main className="page-main" id="page-main">
          <Router />
        </main>

      </div>
    </AuthProvider>
  )
}

export default App;