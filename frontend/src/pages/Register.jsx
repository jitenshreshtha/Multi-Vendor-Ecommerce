import React, { useState } from "react";
import axios from 'axios';

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register",form);
            alert("Registered successfully. Please login");
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={form.name} name="name" onChange={handleChange} />
                <input type="text" name="email" value={form.email} onChange={handleChange} />
                <input type="text" name="password" value={form.password} onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register;