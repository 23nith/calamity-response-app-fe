import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
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
          <Route exact path="/calamity-response-app-fe/success" component={Success}>
            <Success/>
          </Route>
          <Route exact path="/calamity-response-app-fe/failed" component={Failed}>
            <Failed/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
