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
              setAmount(Number(e.target.value))
            }} label={"Amount in (RS)"} placeholder={"Enter Amount"} />
          <div className="mt-2 w-full ">
            <button onClick={
               (e) => {
                axios.post('http://localhost:3000/api/v1/account/transfer', {
                  to: id,
                  amount
                },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              })
            }} 
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