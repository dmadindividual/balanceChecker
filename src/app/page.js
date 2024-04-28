'use client'
import React, { useState, useEffect } from 'react';
const { ethers, JsonRpcProvider } = require('ethers');
import creator from '../app/ape1.png';
import logo from '../app/eth.png';
import Image from 'next/image';
import './styles.css'

const Page = () => {
  const [account, setAccount] = useState('');
  const [connect, setConnect] = useState(false);
  const [balance, setBalance] = useState('');

  const failMessage = 'Please install MetaMask';
  const successMessage = 'You have connected successfully to MetaMask';
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      alert(failMessage);
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const account = accounts[0];
        setAccount(account);

        const provider = new JsonRpcProvider('https://mainnet.infura.io/v3/0e5d95bf0bcc42de974ff8f63de693b8');
        const balance = await provider.getBalance(account);
        setBalance(balance.toString()); // Convert balance to string for display
      } else {
        alert(failMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const connectWallet = async () => {
    if(!window.ethereum)return
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    const account = accounts[0];
    setAccount(account)
    window.location.reload()
  }

  useEffect(() => {
   

    checkIfWalletIsConnected();
  }); 

  useEffect(()=>{
    async function accountChanged(){
      window.ethereum.on('accountsChanged', async function(){
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if(accounts.length ){
          setAccount(accounts[0])
        }else{
          window.location.reload()
        }
    
      })
    }
    accountChanged()
  }, [])

  return (
    <div className='card_container'>
      {!account ? '': <span className='pro'>PRO</span>}
      <Image src={creator} alt='avatar' width={80} height={80}/>
      <h1>Check Ether</h1>

      {!account ?(
        <div>
          <div  className='message'>
            <p>{failMessage}</p>

          </div>
          <Image src={logo} alt='logo' width={100} height={100}/>
          <p>Welcome to ether account balance checker</p>
        </div>
      ):(
        <div>
        <h6>Verified</h6>
        <p>Ether Account and Balance Checker <br/> fin account details</p>
        <div className='buttons'>
          <button className='primary ghost' onClick={()=>{}}>Ether Account details</button>
        </div>
        </div>
      )
      }

      {!account && !connect ? (
        <div className='buttons'>
          <button className='primary' onClick={connectWallet}>Connect Wallet</button>
        </div>

      ):(
        <div className='skills'>
 <h6>Your Ether</h6>
  <ul>
    <li className="meta_address">Account</li>
    <li className="meta_address">{account}</li>
    <li>Balance</li>
    <li>{balance}</li>
  </ul>
        </div>
      )}

    </div>
  );
};

export default Page;
