import { useEffect, useState } from "react";
import axios from "axios";


export default function MyOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/orders/my", {
                headers:{Authorization:`Bearer ${token}`}
            });
            setOrders(response.data.orders);
        };
        fetchOrders();
    }, [])
    return (
        <div>
            <h2>My Orders</h2>
            {orders.length === 0 ? (<p>No orders found</p>) : (
                orders.map((order) => (
                    <div>
                        <p>{order._id}</p>
                        <p>${order.totalPrice}</p>
                        <p>{order.deliveryStatus}</p>
                        <div>
                            <p>Items:</p>
                            {order.orderItems.map((item, i) => (
                                <p>{item.name} x {item.quantity}</p>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}