import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({label, buttonText, to}) => {
  return (
    <div className='text-slate-500 text-sm py-2'>
        <div>
        {label}
        </div>
        <Link className='pointer underline cursor-pointer ' to={to}>
            {buttonText}
        </Link>
    </div>

  )
}

export default BottomWarning