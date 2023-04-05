import React from 'react';
import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { Link, useParams } from "react-router-dom";
import { Utils } from "alchemy-sdk";


import './TransactionsInfo.css'

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

export const alchemy = new Alchemy(settings);

const TransactionsInfo = () => {
    const { tx } = useParams();
    const [fromAdr, setFromAdr] = useState();
    const [toAdr, setToAdr] = useState();
    const [value, setValue] = useState();

    
    useEffect(() => {
        const controller = new AbortController();
        async function getTransactionData() {
            const txDetails = await alchemy.core.getTransactionReceipt(tx);
            const fromAdr = txDetails.from;
            const toAdr = txDetails.to

            const  Details = await alchemy.core.getTransaction(tx)
            const Txvalue =  Utils.formatUnits(Details.value._hex, 'ether')

            setFromAdr(fromAdr);
            setToAdr(toAdr);
            setValue(Txvalue)
        }

        getTransactionData()
        return() => controller.abort();
    }, [fromAdr, toAdr, tx, value])
    
    
    return <div className="transaction-details">
            <h1>
                Transaction
            </h1>
                <h2>
                    {tx}
                </h2>
                <br></br>
                    <h3 className="details">
                        <p className="text">
                        From:
                        </p>
                        <p className="hash">
                        <Link className="links"to={`/address/${fromAdr}`}>{fromAdr}</Link>
                        </p>
                        <p className="text">
                        To: 
                        </p>
                        <p className="hash">
                        <Link className="links"to={`/address/${toAdr}`}>{toAdr}</Link>
                        </p>
                        <p className="text">
                        Value:
                        </p>
                        <p className="hash">
                        {value} ETH
                        </p>
                    </h3>
            </div>
    
}
export default TransactionsInfo