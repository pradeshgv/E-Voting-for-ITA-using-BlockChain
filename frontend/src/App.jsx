import React, { useState, useEffect } from "react";
import Web3 from "web3";
import myContract from "../../build/contracts/myContract";

function App() {
    const [value, setValue] = useState(null);
    const [contract,setContract]=useState(null);
    const [num,setNum]=useState(0);

    useEffect(() => {
        const loadBlockchainData = async () => {
            const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = myContract.networks[networkId];
            const contract1 = new web3.eth.Contract(
                myContract.abi,
                deployedNetwork && deployedNetwork.address,
            );
            
            // console.log(contract1);
            setContract(contract1);
            await contract1.methods.setValue(1).send({ from: "0x1caca2114553dec8214f6391a8255753db86a35d" });
            const value = await contract1.methods.getValue().call();
            setValue(value);
        };

        loadBlockchainData();
    }, [num]);
    const setData=async (e)=>{
        e.preventDefault();
        await contract.methods.setValue(Number(e.target.value)).call();
    }
    return (
        <div className="App">
            Number: <input id="p1" type="number" onChange={setData} />
            <button onClick={setData}>set value</button>
            <h1>{value !== null ? value : "Loading..."}</h1>
        </div>
    );
}

export default App;
