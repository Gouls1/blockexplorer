import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"

import './searchBar.css'

const SearchBar = () => {

    let navigate=useNavigate();
    const [message, setMessage] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value);

    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            // setSearchInput(message);
            if (message.length === 42) {
            navigate("/address/" + message)
            }
            else if (message.length > 42 ){
            navigate("/transaction/" + message)
            }
        }
    }

    return <div className="search">
        <input
            type="search"
            id="search"
            placeholder="Enter a wallet address or a transaction hash"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
             />
    </div>
};

export default SearchBar;