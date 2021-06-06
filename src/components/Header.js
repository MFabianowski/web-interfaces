import { useContext } from "react";
import { auth } from "../firebase.js";
import {NavLink, BrowserRouter as Router} from 'react-router-dom';
import Navigation from "./Navigation"
import { AuthContext } from "./AuthContext"

import './styles/Header.css';

const Header = () => {
    const {user} = useContext(AuthContext);

    const logOut = () => {
        auth.signOut();
    }

    if(user)
        return (
            <>
            <Router>
                <header className="my-header">Marvel-ous Burgers</header>
                <main>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink to="/" exact className="nav-link">Home</NavLink>
                    <NavLink to="/menu" className="nav-link">Menu</NavLink>
                    <NavLink to="/orderStory" className="nav-link">Order history</NavLink>
                    <button className="btn btn-primary" onClick={logOut}>Log out</button>
                </nav>
                <Navigation />
                </main>
            </Router>
            </>
        )
    return (
        <>
        <Router>
            <header className="my-header">Marvel-ous Burgers</header>
            <main>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink to="/" exact className="nav-link">Home</NavLink>
                <NavLink to="/menu" className="nav-link">Menu</NavLink>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                <NavLink to="/register" className="nav-link">Register</NavLink>
            </nav>
            <Navigation />
            </main>
        </Router>
        </>
    )    
}

export default Header;