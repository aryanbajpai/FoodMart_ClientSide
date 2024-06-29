import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../HELPERS/AuthContext";
import aDmIn from '../../IMAGES/admin.png';

export const AdminLogin = () => {
  const adminData = {
    username: "admin001",
    password: "Admin001",
  };
  const { setAuthState } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("adminLogged")) || []
  );
  const navigate = useNavigate();

  const adminLogin = (e) => {
    e.preventDefault();
    if (username === adminData.username && password === adminData.password) {
      const AdminLogged = {
        Name: adminData.username,
        Pswd: adminData.password,
      };
      localStorage.setItem("adminLogged", JSON.stringify(AdminLogged));

      setAdmin(AdminLogged);
      setAuthState({
        username: adminData.username,
        password: adminData.password,
        status: true,
      });
      navigate("/adminHome");
    } else {
      setError("Invalid Username or Password.");
    }
  };

  return (
    <div className="flex flex-col h-[90vh] items-center"> 
      <div className="mt-6">
        <img src={aDmIn} alt="Admin" />
      </div>
      <div className="bg-orange-300 rounded-xl w-[500px] mt-4 m-auto py-4 px-5">
        <h2 className="text-[30px] text-center font-bold">Admin Login</h2>
        <form onSubmit={adminLogin} className="text-xl ">
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
  );
};
