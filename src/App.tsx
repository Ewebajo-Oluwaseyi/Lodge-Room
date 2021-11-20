import React from 'react';
import Container from './Container/Container';
import './Styles/App.css'
import { withRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/authContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider><Container/></AuthContextProvider>
    </div>
  );
}

export default withRouter(App);
