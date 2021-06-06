import { useEffect, useState, useContext } from "react";
import { firestore, auth, addOrder } from "../firebase";
import { AuthContext } from "./AuthContext"
import { uuidv4 } from "../utils/uuidv4";

import "./styles/Menu.css";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        getMenu();
    }, [])

    const getMenu= async () => {
        const response = firestore.collection('menu');
        const data = await response.get();
        data.docs.forEach(burger=>{
            setMenu(menu => [...menu, burger.data()])
        })
    }

    const addToOrder = (burger) => {
        setOrder(order.concat([burger]))
    }

    const removeFromOrder = (burger) => {
        const burgerList = order.filter((item) => item !== burger);
        setOrder(burgerList);
    }

    const placeOrder = () => {
        addOrder(auth.currentUser, {order});
        setOrder([]);
    }

    if(user)
        return (
            <>
            <div className="menu-main">
                <div>
                    <h1>MENU</h1>
                    {menu.map((burger)=>{
                        return (
                            <div key={uuidv4(burger.id)} className="card margin-down">
                                <div className="card-body">
                                    <h3 className="card-title">{burger.name}</h3>
                                    <h4 className="card-subtitle">{burger.price} PLN</h4>
                                    <h5>Ingredients:</h5>
                                    <ul>
                                        {burger.ingredients.map((i) => {
                                            return (
                                                <div>
                                                    <li key={uuidv4(i)}>{i}</li>
                                                </div>
                                            )
                                        })}
                                    </ul>
                                    <button type="button" className="btn btn-default" onClick={() => addToOrder(burger)}>Add to order</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h3>Your order:</h3>
                    {order.map((burger) => {
                        return (
                            <div key={uuidv4(burger.id)} className="card margin-down">
                                <div className="card-body">
                                    <h3 className="card-title">{burger.name}</h3>
                                    <h4 className="card-subtitle">{burger.price} PLN</h4>
                                    <button type="button" className="btn btn-danger margin-up" onClick={() => removeFromOrder(burger)}>Remove</button>
                                </div>
                            </div>
                        )
                    })}
                    {order.length === 0 ? <></>: <button type="button" className="btn btn-primary margin-up" onClick={placeOrder}>Place order</button>}
                </div>
            </div>
            </>
        )

    return (
        <>
        <div className="menu-main">
            <div>
                <h1>MENU</h1>
                {menu.map((burger)=>{
                    return (
                        <div key={uuidv4(burger.id)} className="card margin-down">
                            <div className="card-body">
                                <h3 className="card-title">{burger.name}</h3>
                                <h4 className="card-subtitle">{burger.price} PLN</h4>
                                <h5>Ingredients:</h5>
                                <ul>
                                    {burger.ingredients.map((i) => {
                                        return (
                                            <div>
                                                <li key={uuidv4(i)}>{i}</li>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Menu;