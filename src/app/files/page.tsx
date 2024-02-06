'use client'

import Upload from "../components/abi/Upload.json";

import { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import Display from "../components/Display";
import Model from "../components/Model";
const ethers = require("ethers");

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [openModel, setOpenModel] = useState(false);
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
      const contractABI = Upload.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          })

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    }
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div className="flex flex-col  mt-10  w-full ">
      {!openModel && (
        <button className="share h-10 w-32 bg-slate-400 rounded-full text-white self-end "
          onClick={() => setOpenModel(true)}>Share</button>
      )}{" "}
      {openModel && (
        <Model setOpenModel={setOpenModel}
          contract={state.contract} />
      )}
      <div className="App">
        <h1 className="mt-5 text-center text-[3rem] text-[#b26af6]">G-drive 3.0</h1>
        <br />
        <div className="">
        <p className="text-xl mb-5">Account: {account}</p>
        <div>
          <FileUpload
            account={account}
            provider={state.provider}
            contract={state.contract} />
          <br />
          <br />
          <Display
            contract={state.contract}
            account={account}
          />
        </div>
        </div>
      </div>
    </div>
  )
}
export default App;
