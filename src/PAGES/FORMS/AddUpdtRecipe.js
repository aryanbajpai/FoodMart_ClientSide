import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { addReciepe } from "../../SERVICES/reciepeApi";
import foodRecipe from "../../IMAGES/recipe.png";

export const AddUpdtRecipe = () => {
  const navigate = useNavigate();

  const addNew = () => {
    navigate("/addreciepe");
  };
  const updt = () => {
    navigate("/updtreciepe");
  };
  const goBack = () => {
    navigate("/adminHome");
  };

  const view = () => {
    navigate('/viewRecipe');
  }

  return (
    <div className="flex relative lg:flex-row flex-col h-[88vh] items-center justify-center">
      <div>
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

        <div className="absolute top-2 right-2 m-2">
          <button onClick={view} className="px-5 font-semibold rounded-lg bg-orange-500 text-white py-2 hover:scale-[1.03]" >View Recipes</button>
        </div>
      </div>

      <div className="mt-6">
        <img className="w-[500px] h-[460px]" src={foodRecipe} alt="Admin" />
      </div>

      <div className="w-[500px]">
        <div className="bg-orange-300 rounded-xl mt-4 py-4 px-5">
          <h2 className="text-[30px] text-center font-bold">RECIPE</h2>
          <form className="text-xl flex my-3">
            <div className="max-w-[195px] w-auto m-auto">
              <button
                onClick={addNew}
                className="bg-orange-200 px-5 font-semibold rounded-lg hover:bg-orange-500 hover:text-white py-2"
                type="submit"
              >
                Add New Recipe
              </button>
            </div>
            <div className="max-w-[195px] w-auto m-auto">
              <button
                onClick={updt}
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
