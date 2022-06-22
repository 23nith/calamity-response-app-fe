import './App.css';
import {Route} from 'react-router-dom';
import Success from './components/success';
import Failed from './components/failed';
import Sidebar from './components/sidebar';

function App() {
  return (
    // <Router>
        <div>
          <Route exact path="/">
            <Sidebar/>
          </Route>
          <Route exact path="/success" component={Success} />
          <Route exact path="/failed" component={Failed} />
        </div>
            
    // </Router>
  );
}

export default App;
