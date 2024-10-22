import React, { useState } from 'react'
import mAnAger from '../../IMAGES/manager.png';
import { useNavigate } from 'react-router-dom';

export const ManagerLogin = () => {
  const navigate = useNavigate();

    const dummyData = {
        "username": "mngr001",
        "password": "Mngr001"
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const mngrLogin = (e) => {
        e.preventDefault();

        if(username===dummyData.username && password===dummyData.password){
            navigate('/mngrHome')
        } else {
            setError('Invalid Username or Password');
        }
    };

  return (

    <div className="flex flex-col h-[90vh] items-center"> 
      <div className="mt-6 w-[250px] h-[250px]">
        <img src={mAnAger} alt="Manager" />
      </div>
      <div className="bg-orange-300 rounded-xl w-[500px] mt-4 m-auto py-4 px-5">
        <h2 className="text-[30px] text-center font-bold">Manager Login</h2>
        <form onSubmit={mngrLogin} className="text-xl ">
          <div className="my-2">
            <label>Username: </label>
            <input
              className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
              type="text"
              name="username"
              value={username}
              placeholder="Enter Username..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label>Password: </label>
            <input
              className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
              type="password"
              name="password"
              value={password}
              placeholder="Enter password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="max-w-[100px] w-auto m-auto">
            <button
              className="bg-orange-200 px-5 font-semibold rounded-lg hover:bg-orange-500 hover:text-white py-2"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
