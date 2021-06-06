import { useState } from 'react';
import { Redirect } from 'react-router-dom'

import { auth } from '../firebase';

import "./styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userLogged, setUserLogged] = useState(false);
    const [wrongData, setWrongData] = useState(false);
    const [error, setError] = useState("");

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).then(() => {
            console.log("logged in");
            setUserLogged(true);
            setWrongData(false);
            setError("")
        }).catch((error) => {
            console.log(error);
            setWrongData(true)
            setError("Wrong email or password")
        });
    }

    if(userLogged) {
        return <Redirect to="/" exact />
    }

    return (
        <>
        <div className="loginInput">
            <h2>Log in</h2>
            <div className="form-group">
                <label htmlFor="inputEmail" className="form-label">Email</label>
                <input
                    id="inputEmail"
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}>
                </input>
                <label htmlFor="inputPassword">Password</label>
                <input
                    id="inputPassword"
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}>
                </input>
                {wrongData && <div role="alert" className="alert-danger">{error}</div>}
                <button type="button" className="btn btn-primary" onClick={signIn}>Log In</button>
            </div>
        </div>
        </>
    )
}

export default Login;