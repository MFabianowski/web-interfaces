import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from "../firebase";

import "./styles/Register.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");

    const regist = () => {
        if (password !== confirmPass) {
            return setError("Passwords must be the same!")
        }
        if (password.length < 6) {
            return setError("Password must have at least 6 signs!")
        }

        setError("")
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            auth.signInWithEmailAndPassword(email, password)
            .then(loggedUser => {
                loggedUser.user.updateProfile({
                    displayName: username,
                })
            })
            .catch(error => {
                console.log(error);
            })

            setRedirect(true);
        })
        .catch(error2 => {
            setError(error2);
        })
    };

    if (redirect) {
        return <Redirect to="/" exact />
    }

    return (
        <>
        <div className="regInput">
            <h2>Register</h2>
            <div className="form-group">
                <label htmlFor="usernameInput" className="form-label">Username</label>
                <input
                    id="usernameInput"
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}>
                </input>
                <label htmlFor="emailInput" className="form-label">Email</label>
                <input
                    id="emailInput"
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}>
                </input>
                <label htmlFor="passInput">Password</label>
                <input
                    id="passInput"
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}>
                </input>
                <label htmlFor="passConfInput">Confirm password</label>
                <input
                    id="passConfInput"
                    className="form-control"
                    type="password"
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}>
                </input>
                {error && <div role="alert" className="alert-danger">{error}</div>}
                <button type="button" className="btn btn-primary" onClick={regist}>Register</button>
            </div>
        </div>
        </>
    )
}

export default Register;