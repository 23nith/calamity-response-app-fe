import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Success from './components/success';
import Failed from './components/failed';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/calamity-response-app-fe/">
            <div className="App">
              Home
            </div>
          </Route>
          <Route exact path="/calamity-response-app-fe/success">
            <Success/>
          </Route>
          <Route exact path="/calamity-response-app-fe/failed">
            <Failed/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
