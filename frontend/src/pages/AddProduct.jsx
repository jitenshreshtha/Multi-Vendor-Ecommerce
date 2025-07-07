import React,{useState} from "react";
import axios from "axios";

export default function AddProduct(){
    const [form,setForm] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        category:"",
        imageUrl:""
    });
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    };
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/products',form,{
                headers:{Authorization:`Bearer ${token}`}
            });
            alert("Product added");
        } catch (error) {
            alert(error.response?.data?.message || "Error adding product")
        }
    }
    return(
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                {["name", "description", "price", "stock", "category", "imageUrl"].map((field) => (
          <input key={field} name={field} placeholder={field} onChange={handleChange} value={form.field}/>
        ))}
                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}