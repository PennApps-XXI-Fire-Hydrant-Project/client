import React from 'react';
import { Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { createBrowserHistory as createHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChatRoomPage from './components/ChatRoomPage';
const history = createHistory();
function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Route path='/' exact component={HomePage} />
        <Route path='/chatroom' exact component={ChatRoomPage} />
      </Router>
    </div>
  );
}
export default App;
