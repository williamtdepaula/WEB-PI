import Register from './pages/register';
import {
  BrowserRouter as Router,
  Route,
  HashRouter
} from "react-router-dom";
import ListPeople from './pages/list_people';

function App() {
  return (
    <HashRouter>
        <Route component={Register}  path="/" exact />
        <Route component={ListPeople}  path="/relatorio" />
    </HashRouter>
  );
}

export default App;
