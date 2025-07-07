import React, { useState, useEffect } from "react";
import axios from "axios";

export default function VendorDashboard() {
    const [vendor, setVendor] = useState(null);
    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/vendor/dashboard", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setVendor(res.data.vendor);
            } catch (error) {
                alert("You must be a vendor to access this page");
                
            }
        }
        fetchVendor();
    }, [])
    return (
        <div>
            <h2>Vendor Dashboard</h2>
            {vendor ? (
                <div>
                    <p>{vendor.shopName}</p>
                    <p>{vendor.shopDescription}</p>
                    <p>{vendor.status}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
