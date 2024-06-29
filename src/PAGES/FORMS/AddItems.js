import React, { useEffect, useState } from "react";
import { getVendors } from "../../SERVICES/api";
import "../../App.css";
import { additems } from "../../SERVICES/itemsAPI";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getItems } from "../../SERVICES/itemsAPI";
import "../../App.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(255, 131, 86)",
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(255, 224, 199)",
  },
}));

export const AddItems = () => {
  const [items, setItems] = useState([]);
  const [vendorNm, setVendorNm] = useState("");
  const [itemNm, setItemnm] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const [array, setArray] = useState([]);
  localStorage.setItem("items", JSON.stringify(array));

  useEffect(() => {
    getVendors().then((resp) => {
      setItems(resp.data);
    });
  }, []);

  const AddToDB = async (e) => {
    e.preventDefault();
    if (!vendorNm || !itemNm || !quantity || !weight) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const newItem = { vendorNm, itemNm, quantity, weight };
      setArray([...array, newItem]);
      await additems(newItem);

      setItemnm("");
      setQuantity("");
      setWeight("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vendorNm || !itemNm || !quantity || !weight) {
      navigate("/adminHome");
    }
    try {
      const newItem = { vendorNm, itemNm, quantity, weight };
      await additems(newItem);

      setVendorNm("");
      setItemnm("");
      setQuantity("");
      setWeight("");

      localStorage.removeItem("items");
      navigate("/adminHome");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const goBack = () => {
    navigate("/adminHome");
  };

  return (
    <div>
      <div className="svg absolute top-[75px] left-2 mx-3 my-2">
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
      <div className="xl:flex items-center mt-[85px]">
        <div className="xl:w-[800px] w-full">
          <form
            onSubmit={handleSubmit}
            className="text-xl w-[500px] m-auto my-5 bg-orange-300 rounded-xl py-4 px-5"
          >
            <h2 className="text-[36px] text-center my-2 font-bold">
              Add Items
            </h2>
            <div className="my-2">
              <label>Vendor's Name: </label>
              <input
                className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
                type="text"
                name="vendorNm"
                value={vendorNm}
                placeholder="Enter vendor's name here..."
                onChange={(e) => setVendorNm(e.target.value)}
              />
            </div>
            <div>
              <div className="my-2">
                <label>Add Items: </label>
                <input
                  className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
                  type="text"
                  name="itemNm"
                  value={itemNm}
                  placeholder="Enter items name..."
                  onChange={(e) => setItemnm(e.target.value)}
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
                  <option value="Kg">(Kg)</option>
                  <option value="gram">(gram)</option>
                  <option value="L">(L)</option>
                  <option value="mL">(mL)</option>
                  <option value="Darjan">(Darjan)</option>
                </select>
              </div>
              <div className="my-2">
                <label>Quantity: </label>
                <input
                  className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
                  type="number"
                  name="quantity"
                  value={quantity}
                  placeholder="Enter items quantity..."
                  onChange={(e) => setQuantity(e.target.value)}
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
            </div>

            <div className="max-w-[125px] w-auto m-auto text-lg">
              <button
                className="bg-orange-200 px-5 font-semibold rounded-lg hover:bg-orange-500 hover:text-white py-2"
                type="submit"
              >
                Purchase
              </button>
            </div>
          </form>

          {array.length > 0 && (
            <div className="mx-4">
              <h2 className="text-[28px] font-bold">Items added:</h2>
              {array.map((a, i) => (
                <span className="text-xl mx-2" key={i}>
                  ({a.quantity} {a.weight}) {a.itemNm}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* <div className="w-full mt-7 h-[2px] bg-orange-600"></div> */}

        <div className="my-3 w-[800px] m-auto">
          <h1 className="text-center text-[36px] font-bold">Vendor's List: </h1>
          <TableContainer className="" component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow className="tr">
                  <StyledTableCell>Sr. No.</StyledTableCell>
                  <StyledTableCell>Vendor's Name</StyledTableCell>
                  <StyledTableCell>Phone No.</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((row, index) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.vendors}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.phone}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
