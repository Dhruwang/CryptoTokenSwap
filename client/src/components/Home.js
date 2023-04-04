import React, { useEffect,useState } from 'react'
const Web3 = require("web3")


export default function Home() {

  const [balance, setbalance] = useState(0)
  const [senderAddress, setSenderAddress] = useState("")
  const [receiverAddress, setreceiverAddress] = useState("")
  const [amount, setAmount] = useState()

  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_SEPOLIA_URL))

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => {
          // Return the address of the wallet
          setSenderAddress(res[0])
          web3.eth.getBalance(res[0])
          .then((balance)=>{
            setbalance(web3.utils.fromWei(balance))
          })
        })
    } else {
      alert("install metamask extension!!")
    }
  }

  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    await web3.eth.sendTransaction({
      from: senderAddress,
      to: receiverAddress,
      value: web3.utils.toWei(amount,"ether")
  })
  .then(function(receipt){
      console.log(receipt)
  });
  }

  const handleAddress=(e)=>{
    setreceiverAddress(e.target.value)
  }
  const handleAmount=(e)=>{
    setAmount(e.target.value)
  }
  useEffect(() => {
    connectWallet()
  }, [])



  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h2>Transfer Eth</h2>
        <p>Your Balance : {balance} eth</p>
        <p>Your address : {senderAddress}</p>
        <div className='inputDiv'>
            <p>Enter Receiver Address</p>
            <input id='receiverAddress' type='text' value={receiverAddress} onChange={handleAddress}></input>
        </div>
        <div className='inputDiv'>
            <p>Enter amount to trannsfer</p>
            <input id="amount" type='number' step="any" value={amount} onChange={handleAmount}></input>
        </div>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}