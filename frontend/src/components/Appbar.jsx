import { Avatar } from "./Avatar"

const Appbar = () => {
  return (
    <div className="flex h-14 shadow justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTm
        </div>
        <div className="flex ">
            <div className="flex flex-col justify-center mr-4">
                Hello
            </div>
            <div className="mt-1 mr-6">
                <Avatar />
            </div>
        </div>
        
    </div>
  )
}

export default Appbar