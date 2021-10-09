import Register from './pages/register';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
        <Route component={Register}  path="/registro" />
    </Router>
  );
}

export default App;
