import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [shipping, setshipping] = useState({
        street: "",
        city: "",
        country: "",
        zip: ""
    });
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    const handleOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:5000/api/orders", {
                cartItems,
                shippingAddress: shipping
            },{
                headers:{Authorization:`Bearer ${token}`}
            });
            alert("Order placed");
            localStorage.removeItem("cart");
            setCartItems([]);
        } catch (error) {
            alert(error.response?.data?.message || "Error placing order");
        }
    }

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (<p>Your cart is empty</p>) : (
                <div>
                    {cartItems.map((item, idx) => (
                        <div>
                            <p>Qty:{item.quantity}</p>
                        </div>
                    ))}
                    <h3>Shipping Address</h3>
                    {["street", "city", "country", "zip"].map((f) => (
                        <input key={f} name={f} value={shipping[f]} onChange={(e) => setshipping({ ...shipping, [f]: e.target.value })} />
                    ))}
                    <button onClick={handleOrder}>Place Order</button>
                </div>
            )}
        </div>
    )
}