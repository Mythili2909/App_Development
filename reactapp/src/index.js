import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import { QuestionsProvider } from '../src/components/QuestionsContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root

root.render(
  <React.StrictMode>
    <AuthProvider>
    <QuestionsProvider>
      <Router>
        <App />
      </Router>
    </QuestionsProvider>
    </AuthProvider>
  </React.StrictMode>
);
