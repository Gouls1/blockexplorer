import React from 'react';
import { useEffect, useState } from 'react';
import {alchemy} from '../App';
//import {block} from './App';
import './Transactions.css'

import {Link, useParams} from 'react-router-dom';



  const Transactions = (props) => {
    const {block} = useParams();
    const [myTx, setMyTx] = useState();
    
    useEffect(() => {
        const controller = new AbortController();
        async function getTransactions() {
            const data = await alchemy.core.getBlock(props.block);
            setMyTx(data.transactions);
          }
          getTransactions();
          return() => controller.abort();
        }, [props.block]);
  
    return <div className="Transactions">
          <h1>
            Block {block}
          </h1>
            <h2>
        List of transactions in block:
            </h2>
              <h3 className="transactions">
        {myTx && myTx.map((tx, i) => <ul key = {tx}><Link className="links" to={`/transaction/${tx}`}>{tx}</Link></ul>)}
              </h3>
         </div>;
  }
  export default Transactions;
