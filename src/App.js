import './App.css';
import {Route} from 'react-router-dom';
import Success from './components/success';
import Failed from './components/failed';

function App() {
  return (
    // <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              Home
            </div>
          </Route>
          <Route exact path="/success" component={Success} />
            
          <Route exact path="/failed" component={Failed} />
            
        </Switch>
    // </Router>
  );
}

export default App;
