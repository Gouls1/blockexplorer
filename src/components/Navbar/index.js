import React from 'react';
import './Navbar.css'
import { useEffect, useState } from 'react';
import  SearchBar from '../searchBar';

export const Navbar = () => {
    return (
        <nav className="nav">
            <a href="/" className="home">
            BlockScan
            </a>
            <ul>
               <SearchBar />
            </ul> 
        </nav>  
    )  
};

export default Navbar;