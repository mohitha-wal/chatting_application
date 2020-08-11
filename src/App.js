import React from 'react';

import Chat from './Components/Chat/Chat';
import Join from './Components/Join/join';
import FollowRequest from './Components/FollowRequest/followRequest'
import InfoBar from './Components/ChatBox/ChatBox'
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/followrequests" component={FollowRequest}/>
      <Route path="/msgbox" component={InfoBar}/>
    </Router>
  );
}

export default App;