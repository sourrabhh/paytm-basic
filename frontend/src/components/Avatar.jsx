/* eslint-disable react/prop-types */

export const Avatar = ({name = ""}) => {
  const firstLetter = name.trim() ? name.charAt(0).toUpperCase() : "?";
  return (
    <div className="flex rounded-full w-12 h-12 bg-green-500 items-center justify-center"> 
        <span className="text-2xl text-white">{firstLetter}</span>    
    </div>
  )
}
