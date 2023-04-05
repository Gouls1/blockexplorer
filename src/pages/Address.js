import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { Utils } from "alchemy-sdk";

import './Address.css';


const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  export const alchemy = new Alchemy(settings);


  const Address = () => {
    const {address} = useParams();
    const [ethBalance, setEthBalance] = useState();
    const [myBalances, setMyBalances] = useState();
    // const address = "0x12BeDff5350f138d9F2975018729301857CdF2E6"
    
    useEffect(() => {
        async function getBalances() {
            const ethBalance = (await alchemy.core.getBalance(address, "latest"));
            const etherBalance =  (Utils.formatUnits(ethBalance._hex, 'ether')).substring(0,6);
            
            const balances = await alchemy.core.getTokenBalances(address);
            // setMyBalances(balances);

            const nonZeroBalances = balances.tokenBalances.filter((token) => {
                return token.tokenBalance !== "0";
            });
            let i = 1;
            let addressBalances = [];
            for (let token of nonZeroBalances) {
                let tokenInfo = {};
                let balance = token.tokenBalance;

                const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

                balance = balance / Math.pow(10, metadata.decimals);
                balance = balance.toFixed(2);

                tokenInfo.id = i;
                tokenInfo.name = metadata.name;
                tokenInfo.balance = balance;
                tokenInfo.symbol = metadata.symbol;

                addressBalances.push(tokenInfo);
                i++;
            }
            
            setEthBalance(etherBalance);
            setMyBalances(addressBalances);
        };
        getBalances();
    }, [myBalances, ethBalance]);

    return (
        <div className="Address">
            <h1>
                Address
            </h1>
                <h2>
                    {address}
                </h2>
                <h2 className="balance">
                {ethBalance} ETH
                </h2>
                {myBalances && myBalances.map((bal, i) => <ul key = {bal.id}>{bal.name} - {bal.balance} {bal.symbol} </ul>)}
        </div>
    )
  }

export default Address
