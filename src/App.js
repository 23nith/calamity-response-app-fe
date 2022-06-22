import './App.css';
import {Route, Switch} from 'react-router-dom';
import Success from './components/success';
import Failed from './components/failed';
import Sidebar from './components/sidebar';
import Sign_in from './components/sign_in';
import { useState } from 'react';

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(true)
  
  return (
        <>
          {showLogin && <Route exact path="/" component={Sign_in} />}
          {!showLogin && <div className='flex'>
            <Sidebar/>
            <div className="p-7 text-2xl font-semibold flex-1 h-screen">
                <Route exact path="/success" component={Success} />
                <Route exact path="/failed" component={Failed} />
            </div>
          </div>}
        </>
  );
}

export default App;
