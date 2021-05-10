import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, NavLink} from 'react-router-dom';

import './App.css';
import Main from './components/Main';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <header className="App-header">Tinder for projects</header>
        <main>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to="/" exact className="nav-link">Lists of students and groups</NavLink>
                <NavLink to="/newStudent" className="nav-link">Add student</NavLink>
                <NavLink to="/newGroup" className="nav-link">Add group</NavLink>
            </nav>

            <Main />
        </main>
    </Router>
  );
}

export default App;
