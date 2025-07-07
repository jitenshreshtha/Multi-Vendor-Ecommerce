import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Store() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products/public")
            .then(res => setProducts(res.data.products))
            .catch(err => alert("Failed to fetch products"));
    }, []);
    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find((item) => item.productId === product._id);
        if (existing) {
            existing.quantity += 1;
        }
        else {
            cart.push({ productId: product._id, name: product.name, quantity: 1 });
        }
        localStorage.setItem("cart",JSON.stringify(cart));
        alert("Added to Cart")
    }
    return (
        <div>
            {products.map((p) => (
                <div key={p._id}>
                    <img src={p.imageUrl} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                    <p>{p.category}</p>
                    <button onClick={() => addToCart(p)}>Add To Cart</button>
                </div>
            ))}
        </div>
    )
}