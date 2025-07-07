import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [form,setForm] =  useState({
        email:"",
        password:""
    });
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login",form);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user))
            if(res.data.status === 200){
                navigate('/');
            }
            
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={form.email} onChange={handleChange} />
                <input type="text" name="password" value={form.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;