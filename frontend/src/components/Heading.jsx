/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

const Heading = ( {label} ) => {
  return (
    <div className='font-bold text-4xl pt-6'>
        {label}
    </div>
  )
}

Heading.prototype = {
    label: PropTypes.string.isRequired,
}

export default Heading