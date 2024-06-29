import React, { useEffect, useState } from "react";
import { getReciepe } from "../../SERVICES/reciepeApi";
import { getCrtRcp } from "../../SERVICES/createRecApi";
import { useNavigate } from "react-router-dom";

export const ViewRecipe = () => {
  const [recipeData, setReciepeData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getReciepe().then((res) => {
      setReciepeData(res.data);
    });

    getCrtRcp().then((res) => {
      setItemData(res.data);
    });
  }, []);

  useEffect(() => {
    // Reset matched items
    setMatchedItems([]);

    // Iterate over recipeData to find matches in itemData
    recipeData.forEach((recipe) => {
      const matchingItems = itemData.filter(
        (item) => item.reciepeNm === recipe.reciepeNm
      );
      setMatchedItems((prevItems) => [
        ...prevItems,
        { recipe: recipe, items: matchingItems },
      ]);
    });
  }, [recipeData, itemData]);

  const goBack = () => {
    navigate("/addupdt");
  };
  const create = () => {
    navigate('/addreciepe')
  }

  return (
    <div className="relative">
      <div className="svg absolute top-1 left-2 m-2">
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
      {/* STOCK DATA */}
      <div className="my-3 relative w-[1000px] m-auto h-[90vh] max-h-auto">
        <h1 className="text-center text-[36px] font-bold">RECIPES: </h1>

        {matchedItems.map((match, index) => (
          <div
            key={index}
            className="bg-white my-5 w-[800px] m-auto shadow-xl flex items-center rounded-xl border border-orange-500"
          >
            <h1 className="text-center py-2 px-4 flex-[25%] text-orange-500 text-[36px] font-bold">
              {match.recipe.reciepeNm}
            </h1>

            <div className="flex-[75%] py-2 px-4 border-l border-orange-500">
              <div className="text-xl font-semibold">Ingredients Used:</div>
              <ul className="text-lg px-2">
                {match.items.map((item, idx) => (
                  <li key={idx}>
                    {item.itemNm} - {item.quantity} ({item.weight})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="svg absolute m-7 z-10 w-0 max-w-auto bottom-0 right-10">
          <span className="px-1 w-[121px] ml-[-38px] bg-orange-300 rounded-full">Create Reciepe</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={create}
            className="w-[50px] h-[50px] text-white bg-orange-500 rounded-full p-2 cursor-pointer hover:shadow-xl"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
