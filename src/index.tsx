import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApplicationProvider } from './resources/contexts/ApplicationContext';
import { AuthProvider } from './resources/contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <ApplicationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApplicationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);