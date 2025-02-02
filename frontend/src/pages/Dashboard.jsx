import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className='text-xl font-sm mt-4 ml-4'>
        <Balance />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard