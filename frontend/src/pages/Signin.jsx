import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        username,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if(response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Sign In Successfully");
        navigate('/dashboard');
      }
      else {
        alert("Invalid Credentials")
      }
    } catch (error) {
      console.error('Sign-in error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Sign-in failed. Please try again.');
    }
  }

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
          <div className='flex flex-col justify-center '>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
              <Heading label={"Sign In"} />
              <SubHeading label={"Enter your credentials to access account"} />
              <Inputbox onChange={ (e) => {
                  setUsername(e.target.value);
                }} label={"Email"} placeholder={"Doe Jone"} />
              <Inputbox onChange={ (e) => {
                  setPassword(e.target.value);
                }} label={"Password"} />
              <div className='pt-4'>
                <Button onClick={handleSignIn} label={"Sign In"} />
              </div>
              <BottomWarning label={"Dont have an Account? Please Sign Up here"} buttonText={"Sign Up"} to={"/signup"} />
            </div>
          </div>
        </div>
  )
}

export default Signin