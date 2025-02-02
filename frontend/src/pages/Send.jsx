import { Avatar } from "../components/Avatar"
import Heading from "../components/Heading"
import Inputbox from "../components/Inputbox"
import SecondHeading from "../components/SecondHeading"

const Send = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center p-2 h-max px-4">
          <Heading label={"Send Money"} />
          <div className="flex flex-row items-center mt-10 mb-6">
            <Avatar />
            <SecondHeading />
          </div>
          <Inputbox label={"Amount in (RS)"} placeholder={"Enter Amount"} />
          <div className="mt-2 w-full ">
            <button className="w-full py-2 px-4 rounded-sm font-bold text-sm bg-green-500 text-white">
              Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Send