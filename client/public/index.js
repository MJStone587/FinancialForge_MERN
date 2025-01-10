import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { IncDataContextProvider } from './context/IncDataContext';
import { ExpDataContextProvider } from './context/ExpDataContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //REACT STRICT MODE RUNS TWICE ON DEV BUT ONCE ON LIVE -- HENCE USEEFFECT RUNNING TWICE
  <React.StrictMode>
    <AuthContextProvider>
      <ExpDataContextProvider>
        <IncDataContextProvider>
          <App />
        </IncDataContextProvider>
      </ExpDataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
