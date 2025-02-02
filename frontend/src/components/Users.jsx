/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react"
import Button from "./Button";
import {useNavigate} from 'react-router-dom';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

    // debouncing need to be done 

    useEffect(() => {
        // Only make API call if filter has some value
        if (filter.trim()) {
            axios.get(`http://localhost:3000/api/v1/user/bulkuser?filter=`+filter)
                .then(response => {
                    setUsers(response.data.user);
                })
        } else {
            // Clear users when search is empty
            setUsers([]);
        }
    }, [filter]);

  return (
    <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="mx-4 text-lg my-2">
            <input onChange={(e) => {
                setFilter(e.target.value);
            }} type="text" placeholder="Search User..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
  )
}

function User({user}) {

    const navigate = useNavigate();

    return(
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="p-2 mr-4 flex flex-col h-full justify-center">
                <Button onClick={() => {
                    navigate('/send?id=' +user._id +"&name=" +user.firstName)
                }} label={"Send Money"} />
            </div>

        </div>
    )
}

export default Users