
// eslint-disable-next-line react/prop-types
const Button = ({label, onClick}) => {
  return (
    <button onClick={onClick} className='text-base bg-black text-white rounded py-1.5 w-full focus:outline-none px-2' >
        {label}
    </button>
  )
}

export default Button