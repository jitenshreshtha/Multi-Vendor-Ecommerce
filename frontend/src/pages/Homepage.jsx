import React, { useEffect } from "react";
import axios from 'axios';

function Homepage() {
    useEffect(() => {
        axios.get("http://localhost:5000")
            .then((res) => {if (res.status == 200) { console.log(res.data) }})
            .catch((e) => console.log(e))
    })
    return (
        <div>
            <h3>This is my homepage</h3>
        </div>
    )
}
export default Homepage;