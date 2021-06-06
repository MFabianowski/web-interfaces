import { useEffect,useState } from "react";
import { firestore, auth } from "../firebase";

import "./styles/Order.css"

const OrderHistory = () => {
    const [orderStory, setOrderStory] = useState([]);

    useEffect(() => {
        getOrderHistory();
    }, [])

    const getOrderHistory = async () => {
        const response = firestore.collection('orders').where('owner', '==', auth.currentUser.uid);
        const data = await response.get();
        data.docs.forEach(order => {
            setOrderStory(orderStory => [...orderStory, order.data()])
        })
    }

    return (
        <>
        <div className="order-main">
            <h1>Your order history</h1>
            {orderStory.map((order) => {
                return (
                    <div className="card">
                        <div className="card-body">
                            {order.orderList.order.map((ord) => (
                                <>
                                    <h5>{ord.id}</h5>
                                    <h5>{ord.name}</h5>
                                    <h5>{ord.price} PLN</h5>
                                </>
                                ))}
                            <p>{new Date(order.dataCreated.seconds * 1000).toLocaleDateString("en-US")}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default OrderHistory;