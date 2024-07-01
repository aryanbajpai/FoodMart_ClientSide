import React, { useEffect, useState } from "react";
import { getReciepeById } from "../../../SERVICES/reciepeApi";
import { useNavigate, useParams } from "react-router-dom";
import createRec from "../../../IMAGES/cRep.png";
import { createRecipe } from "../../../SERVICES/createRecApi";

export const CreateReciepe = () => {
  const { reciepeId } = useParams(); //id from RecipeDB
  const [reciepeNm, setReciepe] = useState(""); //Gets name from Recipe DB

  const [itemNm, setItemNm] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const [array, setArray] = useState([]); //To store in LclStrg
  localStorage.setItem("items", JSON.stringify(array));

    useEffect(() => {
      // Fetch recipe data based on reciepeId
      if (reciepeId) {
        getReciepeById(reciepeId)  //createRecipe Data from Database fetch by ID
          .then((resp) => {
            setReciepe(resp.data.reciepeNm);
          })
          .catch(() => {
            setErr("Error fetching the recipe");
          });
      }
    }, [reciepeId]);


  const handleSUbmit = async (e) => {
    e.preventDefault();
    if (!itemNm || !quantity || !weight || !price) {
      setErr("Please fill all fields.");  //VALIDATION
      return;
    }
    try {
      const newItem = { reciepeNm, itemNm, quantity, weight, price };
      console.log(newItem)
      await createRecipe(newItem);  //POST req to add new items to crtRcp DataBase
      navigate("/adminHome");
    } catch (e) {
      setErr("Error adding item.");
    }
  };

  const AddToDB = async (e) => {
    e.preventDefault();
    if (!itemNm || !quantity || !weight || !price) {
      setErr("Please fill all fields.");  //VALIDATION
      return;
    }
    try {
      const newItem = { reciepeNm, itemNm, quantity, weight, price };
      setArray([...array, newItem]);
      await createRecipe(newItem);  //POST req to add new items to crtRcp DataBase
      //Set all the fields empty again
      setItemNm("");
      setQuantity("");
      setWeight("");
    } catch (e) {
      setErr("Error adding item.");
    }
  };

  const goBack = () => {
    navigate("/addreciepe");
  };

  return (
    <div className="flex relative flex-col h-[80vh] items-center justify-center">

    {/* GO BACK */}
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

      <div className="">
        <img className="w-[300px] h-[300px]" src={createRec} alt="Admin" />
      </div>

      <div className="bg-orange-300 rounded-xl py-4 px-5">
        <h2 className="text-[30px] text-center font-bold">
          Create Recipe: {reciepeNm}
        </h2>
        {/*Create new Item for new Recipe*/}
        <form onSubmit={handleSUbmit}>
          <div className="my-2">
            <label>Required Items: </label>
            <input
              className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
              type="text"
              name="itemNm"
              value={itemNm}
              placeholder="Enter items name here..."
              onChange={(e) => setItemNm(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label>Weight: </label>
            <select
              className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            >
              <option value="">Select weight type...</option>
              <option value="gram">(gram)</option>
              <option value="Kg">(Kg)</option>
              <option value="mL">(mL)</option>
              <option value="L">(L)</option>
              <option value="Darjan">(Darjan)</option>
            </select>
          </div>
          <div className="my-2">
            <label>Required Quantity: </label>
            <input
              className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
              type="number"
              name="quantity"
              value={quantity}
              placeholder="Enter quantity of required item..."
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label>Price: </label>
            <input
              className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
              type="number"
              name="quantity"
              value={price}
              placeholder="Enter quantity of required item..."
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          
          <div className="max-w-[180px] w-auto my-3 m-auto">
            <button
              className="bg-orange-200 px-5 text-lg font-semibold rounded-lg hover:bg-orange-500 hover:text-white py-2"
              onClick={AddToDB}
            >
              Add More Items
            </button>
          </div>
          {err && <p style={{ color: "red" }}>{err}</p>}
          <div className="max-w-[160px] w-auto m-auto text-lg">
            <button
              className="bg-orange-200 px-5 font-semibold rounded-lg hover:bg-orange-500 hover:text-white py-2"
              type="submit"
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>

      {/* NEWLY ADDED DATA */}
      {array.length > 0 && (
        <div className="mx-4">
          <h2 className="text-[28px] font-bold">Items added:</h2>
          {/*itrate through LclStrg Array*/}
          {array.map((a, i) => (
            <span className="text-xl mx-2" key={i}>
              ({a.quantity} {a.weight}) {a.itemNm}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
