import React from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Utils } from "alchemy-sdk";

import './Home.css';

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

function Home(props) {
  const [blockNumber, setBlockNumber] = useState();
  const [gasPrice, setgasPrice] = useState();
  const [latestTx, setLatestTx] = useState();
  const [blockList, setBlockList] = useState();


  useEffect(() => {
    const controller = new AbortController();
    async function getBlock() {
      const latestBlock = (await alchemy.core.getBlockNumber());
      setBlockNumber(latestBlock);

      let blockToPush = latestBlock;

      const blocks = [];
      for (let i = 0; i<10; i++) {
        blocks.push(blockToPush);
        blockToPush--;
      }
      setBlockList(blocks);
    }

    async function getGas() {
      let response = await alchemy.core.getGasPrice()
      let gasPrice = parseInt(response._hex).toString();
      let gweiPrice = Utils.formatUnits(gasPrice, 'gwei');
      setgasPrice(parseInt(gweiPrice));
    }

    async function getLatestTx() {
      const block = await alchemy.core.getBlock(props.block);

      const blockTransactions = block.transactions;

      const latestTx = blockTransactions.slice(0,10);
      setLatestTx(latestTx);

    }
    getBlock();
    getGas();
    getLatestTx();
    return() => controller.abort();
  }, [blockNumber, gasPrice, props.block]);

  return <div className="homepage">
    <h1>
      Welcome to BlockScan
    </h1>
      <h2>
      A simple Ethereum explorer
      </h2>
      <h3 className= "latestblock">
      Latest block
      <p>
      <Link className="links" to={`/block/${blockNumber}`} >{blockNumber}</Link>
      </p>
      </h3>
      <h3 className= "gasprice">
        Gas Price
        <p>
        {gasPrice} gwei
        </p>
      </h3>
      <h3 className= "latest-transactions">
        Latest Transactions
        <br></br>
        {latestTx && latestTx.map((tx, i) => <ul key = {tx}><Link className="links" to={`/transaction/${tx}`}>{tx} <br></br></Link></ul>)}
      </h3>
      <h3 className= "block-list">
        Latest Blocks
        {blockList && blockList.map((block, i) => <ul key = {block}><Link className="links" to={`/block/${block}`}>{block}<br></br></Link></ul>)}
      </h3>
      <h3 className="empty">
      Just an empty space
      </h3>


</div>
}

export default Home
