import Register from './pages/register';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import ListPeople from './pages/list_people';
import LoginPage from './pages/login';
import './resources/styles.css'
import MapsPage from './pages/maps';

function App() {
  return (
    <Router>
        <Route component={Register}  path="/" exact />
        <Route component={ListPeople}  path="/relatorio" />
        <Route component={LoginPage}  path="/login" />
        <Route component={MapsPage}  path="/maps" />
    </Router>
  );
}

export default App;
