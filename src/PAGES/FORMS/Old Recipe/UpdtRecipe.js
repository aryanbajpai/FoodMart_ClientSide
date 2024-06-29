import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import foodRecipe from "../../../IMAGES/recipe.png";
import { getCrtRcp } from "../../../SERVICES/createRecApi";

export const UpdtRecipe = () => {
  const [reciepeNm, setReciepeNm] = useState("");
  const [err, setErr] = useState("");

  const [oldData, setOldData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCrtRcp().then((resp) => {
      setOldData(resp.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setReciepeNm("");
    oldData?.map((dt) => {
      if (reciepeNm === dt.reciepeNm) {
        navigate(`/oldreciepe/${dt.reciepeId}`);
      }
    });
  };

  const goBack = () => {
    navigate("/addUpdt");
  };

  return (
    <div className="flex relative lg:flex-row flex-col h-[88vh] items-center justify-center">
      <div className="svg absolute top-2 left-2 m-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          onClick={goBack}
          className=" w-10 h-10 bg-orange-500 p-2 rounded-full text-white cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
          />
        </svg>
        <span className="px-1 bg-orange-300 rounded-full">Back</span>
      </div>

      <div className="mt-6">
        <img className="w-[500px] h-[460px]" src={foodRecipe} alt="Admin" />
      </div>

      <div className="">
        <div className="bg-orange-300 rounded-xl mt-4 py-4 px-5">
          <h2 className="text-[30px] text-center font-bold">Update Recipe</h2>
          <form onSubmit={handleSubmit} className="text-xl ">
            <div className="my-2">
              <label>Reciepe Name:</label>
              <input
                className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
                type="text"
                name="reciepeNm"
                value={reciepeNm}
                placeholder="Enter name to your new recipe :)"
                onChange={(e) => setReciepeNm(e.target.value)}
              />
            </div>
            {err && <p style={{ color: "red" }}>Recipe name is mandatory</p>}
            <div className="max-w-[180px] w-auto m-auto">
              <button
                className="bg-orange-200 px-5 font-semibold rounded-lg hover:bg-orange-500 hover:text-white py-2"
                type="submit"
              >
                Update Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
