import { useState } from 'react';
import BottomWarning from '../components/BottomWarning';
import Button from '../components/Button';
import Heading from '../components/Heading';
import Inputbox from '../components/Inputbox';
import SubHeading from '../components/SubHeading';
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName ] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword ] = useState('');

  const handleSignUp = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
          firstName: firstName, 
          lastName: lastName, 
          username: username, 
          password: password 
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    localStorage.setItem("token", response.data.token);
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);

    } catch (error) {
      console.log("Error :: ",+error);
    }  
  }


  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center px-4 p-2'>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your credentials to access account"} />

          <Inputbox onChange={ (e) => {
            setFirstName(e.target.value);
            }} label={"First Name"} placeholder={"Saurabh"} />

          <Inputbox onChange={ (e) => {
            setLastName(e.target.value);
            }} label={"Last Name"} placeholder={"Shinde"} />

          <Inputbox onChange={ (e) => {
            setUsername(e.target.value);
            }} label={"Username"} placeholder={"xyz@mail.com"} />

          <Inputbox onChange={ (e) => {
            setPassword(e.target.value);
            }} label={"Password"} placeholder={""} />

          <div className='pt-4'>
            <Button onClick={handleSignUp} label={"Signup"}
              />
          </div>
          <BottomWarning label={"Already have an Account ?"} buttonText={"Sign In"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}

export default Signup