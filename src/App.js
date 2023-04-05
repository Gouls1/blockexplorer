import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

import { Routes, Route } from 'react-router-dom'
import  Navbar  from './components/Navbar';
import  SearchBar from './components/searchBar';
import './App.css';

import Transactions from './pages/Transactions';
import Home from './pages/Home';
import TransactionsInfo from './pages/TransactionsInfo';
import Address from './pages/Address';
import Footer from './components/footer';



// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
export const alchemy = new Alchemy(settings);


function App() {
 

  return (
    <div className = 'App' >
      <Navbar />
       <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/block/:block" element={<Transactions />} />
        <Route exact path="/transaction/:tx" element={<TransactionsInfo />} />
        <Route exact path="/address/:address" element={<Address />} />
        </Routes>
        <Footer />
      </div>
    )
  }

export default App;
