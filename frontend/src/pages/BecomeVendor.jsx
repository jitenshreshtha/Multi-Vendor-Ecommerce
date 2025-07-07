import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BecomeVendor() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        shopName: "",
        shopDescription: ""
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            console.log("Token from localStorage:", token);
            console.log("Request payload:", form);


            const res = await axios.post("http://localhost:5000/api/vendor/register", form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            // Store the new token with updated role
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }
            // alert("VEndor profile created");
            navigate('/');
        } catch (error) {
            console.error("Full error details:", error);
            console.error("Error response data:", error.response?.data);
            alert(error.response?.data?.message || "Registration failed - please check console for details");
        }
    }

    return (
        <div>
            <h2>Become a Vendor</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="shopName" onChange={handleChange} value={form.shopName} />
                <textarea name="shopDescription" value={form.shopDescription} onChange={handleChange} />
                <button>Register as Vendor</button>
            </form>
        </div>
    )
}