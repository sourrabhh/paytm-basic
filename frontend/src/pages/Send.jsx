import axios from "axios";
import { Avatar } from "../components/Avatar"
import Heading from "../components/Heading"
import Inputbox from "../components/Inputbox"
// import SecondHeading from "../components/SecondHeading"
import {useSearchParams} from 'react-router-dom';
import { useState } from "react";

const Send = () => {

  const [amount, setAmount] = useState(0);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const name = searchParam.get("name");

  const handleTransfer = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You are not logged in. Please log in again.");
            return;
        }

        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
          alert("Please enter a valid amount.");
          return;
        }
      const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
        to: id,
        amount: numericAmount
      },
      {
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem("token")
        }
      });
      console.log("Response: ", response.data);
      alert(response.data.message);
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Transfer failed.");
    }
  }

  return (
    <div className="bg-slate-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center p-2 h-max px-4">
          <Heading label={"Send Money"} />
          <div className="flex flex-row items-center mt-10 mb-6">
            {/* Avatar */}

            <Avatar name={name} />
            <div className="font-semibold text-2xl pr-10 pl-4 items-center ">
                {name}
            </div>
          </div>
          <Inputbox onChange={ (e) => {
              setAmount(e.target.value)
            }} label={"Amount in (RS)"} placeholder={"Enter Amount"} />
          <div className="mt-2 w-full ">
            <button onClick={ handleTransfer } 
              className="w-full py-2 px-4 rounded-sm font-bold text-sm bg-green-500 text-white">
              Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Send