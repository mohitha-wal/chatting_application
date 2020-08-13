import React from 'react';

import Chat from './Components/Chat/Chat';
import Join from './Components/Join/join';
import FollowRequest from './Components/FollowRequest/followRequest'
import InfoBar from './Components/ChatBox/ChatBox'
import Signup from './Components/signUp/signUp'
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Signup} />
      <Route path="/chat" component={Chat} />
      <Route path="/followrequests" component={FollowRequest}/>
      <Route path="/login" component={Join}/>
    </Router>
  );
}

export default App;