import { useEffect, useState } from "react";
import axios from "axios";

export default function VendorProductList() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/products/my",{
            headers:{Authorization: `Bearer ${token}`}
        });
        setProducts(response.data.products)
    }
    const handleDelete = async(id) =>{
        const token = localStorage.getitem("token");
        await axios.delete(`http://localhost:5000/api/products/${id}`,{
            headers: {Authorization:` Bearer ${token}`}
        });
        fetchProducts();
    }
    useEffect(()=>{
        fetchProducts()
    },[])
    return (
        <div>
            <h2>My Products</h2>
            {products.map((p) => (
                <div key={p._id}>
                    <h3>{p.name}</h3>
                    <p>Price: ${p.price} | Stock: {p.stock}</p>
                    <button onClick={()=> handleDelete(p._id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}