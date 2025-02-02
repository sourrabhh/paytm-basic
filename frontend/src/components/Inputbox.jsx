/* eslint-disable react/prop-types */

const Inputbox = ({label, placeholder, onChange}) => {
  return (
    <div>
        <div className="text-base font-medium text-left py-1 px-1">
            {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200 " />
    </div>
  )
}

export default Inputbox