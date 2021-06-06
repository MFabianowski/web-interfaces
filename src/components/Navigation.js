import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import Menu from './Menu';
import OrderHistory from './OrderHistory';
import Register from './Register';
import StartPage from "./StartPage";

const Navigation = () => {

    return (
        <Switch>
            <Route exact path="/">
                <StartPage/>
            </Route>
            <Route path="/menu">
                <Menu />
            </Route>
            <Route path="/orderStory">
                <OrderHistory />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </Switch>
        )
}

export default Navigation;