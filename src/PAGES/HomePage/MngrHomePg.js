import React, { useEffect, useState } from "react";
import { getReciepe } from "../../SERVICES/reciepeApi";
import { getCrtRcp } from "../../SERVICES/createRecApi";
import delImg from "../../IMAGES/delete.png";

export const MngrHomePg = () => {
  const [recipeData, setReciepeData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [matchedItems, setMatchedItems] = useState([]);

  const [orderData, setOrderData] = useState([]);

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
        { recipe: recipe, items: matchingItems, price: matchedItems.price },
      ]);
    });
  }, [recipeData, itemData]);

  const orderedItem = (match) => {
    const { recipe, items } = match;
    const orderedItem = {
      reciepeNm: recipe.reciepeNm,
      items: items?.map((item) => ({
        itemNm: item.itemNm,
        quantity: item.quantity,
        weight: item.weight,
        price: item.price,
      })),
    };
    setOrderData([...orderData, orderedItem]);
  };

  const del = () => {
    // Remove the last item from orderData array
    const updatedOrderData = [...orderData];
    updatedOrderData.pop();
    setOrderData(updatedOrderData);
  };

  return (
    <div className="flex">
      {/*All RECIPES*/}
      <div className="flex-[72%] h-[92vh] px-7 py-3 overflow-y-auto">
        <h1 className="text-[36px] font-bold ">Recipes:</h1>
        <div className="bg-orange-100 relative w-full rounded-lg h-[92%] p-3  overflow-y-hidden">
          <div className="bg-orange-200 rounded-xl mb-3 p-3 flex items-center">
            <h2 className="text-[25px] font-semibold text-center flex-[20%] border-x border-gray-400">
              Recipe Name
            </h2>
            <div className="flex-[45%] text-[25px] font-semibold text-center border-r border-gray-400">
              Ingridients
            </div>
            <div className="flex-[15%] text-[25px] font-semibold text-center border-r border-gray-400">
              Price
            </div>
            <div className="flex-[20%] text-[25px] font-semibold text-center border-r border-gray-400">
              Order
            </div>
          </div>
          <div className="h-[2px] w-full my-3 bg-orange-500"></div>

          {matchedItems.map((match, index) => (
            <div
              key={index}
              className="bg-orange-600 text-white rounded-xl mb-3 p-3 flex items-center"
            >
              <h2 className="text-[25px]  text-center flex-[20%] ">
                {match.recipe.reciepeNm}
              </h2>
              <div className="flex-[45%] text-[25px]  text-center ">
                <ul className="text-lg px-2">
                  {match.items.map((item, idx) => (
                    <li key={idx}>
                      {item.itemNm} - {item.quantity} ({item.weight})
                    </li>
                  ))}
                </ul>
              </div>
              {match.items.map((item, idx) =>
                idx === 0 ? (
                  <div key={idx} className="flex-[15%] text-[25px] text-center">
                    {item.price}/-
                  </div>
                ) : null
              )}
              <div className="flex-[20%] text-[25px]  text-center ">
                <button
                  onClick={() => orderedItem(match)}
                  className="bg-orange-100 text-black px-5 py-1 text-lg rounded-full"
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*ORDERS TO MAKE*/}
      <div className="flex-[28%] h-auto px-7 ">
        <h1 className="text-[36px] font-bold pt-3">Orders:</h1>
        <div className=" bg-orange-100 h-[500px] relative w-full overflow-y-auto rounded-lg p-3">
          <div className="bg-orange-600 text-white rounded-xl mb-3 p-3 flex items-center">
            <div className="text-[25px] font-semibold text-center flex-[60%] border-x border-white">
              Recipe Name
            </div>
            <div className="text-[25px] font-semibold text-center flex-[40%] border-r border-white">
              Price
            </div>
          </div>
          <div className="h-[2px] w-full bg-orange-500 my-3"></div>

          {orderData.length === 0 ? (
            <div>
              <img
                className="w-[200px] h-[200px] m-auto"
                src={delImg}
                alt="No orders yet"
              />
              <h3 className="text-center text-[28px] font-bold text-indigo-500"><i>NO ORDERS YET</i></h3>
            </div>
          ) : (
            <>
              {orderData?.map((match, index) => (
                <div
                  key={index}
                  className="bg-orange-200 rounded-xl mb-3 p-3 flex items-center"
                >
                  <div className="text-[25px] font-semibold text-center flex-[60%]">
                    {match.reciepeNm}
                  </div>
                  {match.items.map((item, idx) =>
                    idx === 0 ? (
                      <div
                        key={idx}
                        className="flex-[15%] text-[25px] text-center"
                      >
                        {item.price}/-
                      </div>
                    ) : null
                  )}
                </div>
              ))}
              <div className="relative bg-gray-400 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  onClick={del}
                  className="absolute right-0 border border-black hover:bg-red-600 hover:text-white w-10 h-10 p-2 rounded-full hover:cursor-pointer bg-gray-300 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
