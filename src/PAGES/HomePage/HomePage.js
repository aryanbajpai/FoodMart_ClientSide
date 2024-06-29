import React from "react";
import { useNavigate } from "react-router-dom";
import cook from "../../IMAGES/cook.png";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/adminLog");
  };

  const handleMngr = () => {
    navigate("/managerLog");
  };

  return (
    <div className="h-screen flex flex-col my-5 items-cente xl:w-[1230px] m-auto">
      <div className="">
        <img className="m-auto w-[300px] h-[300px]" src={cook} alt="Cook" />
      </div>
      <div className="w-full flex items-center">
        <form className="m-auto rounded-lg bg-orange-300 py-5 w-[300px]">
          <h1 className="text-[34px] font-bold text-center">Login as:</h1>
          <div className="my-3 px-1 w-[300px] m-auto">
            <button className="py-2 w-[130px] px-4 rounded-lg mx-2 text-lg font-semibold hover:border border-white hover:text-white bg-orange-200 hover:bg-orange-500" onClick={handleAdmin}>Admin</button>
            <button className="py-2 w-[130px] px-4 rounded-lg mx-2 text-lg font-semibold hover:border border-white hover:text-white bg-orange-200 hover:bg-orange-500" onClick={handleMngr}>Manager</button>
          </div>
        </form>
      </div>
    </div>
  );
};
