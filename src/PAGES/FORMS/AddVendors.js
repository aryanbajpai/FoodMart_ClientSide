import React, { useState } from "react";
import { addVendor } from "../../SERVICES/api";
import { useNavigate } from "react-router-dom";
import '../../App.css';

export const AddVendors = () => {
  const [formData, setFormData] = useState({
    vendors: "",
    phone: "",
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const response = await addVendor({
        vendors: formData.vendors,
        phone: formData.phone,
      });
      console.log(response);
      setFormData({ vendors: "", phone: "" });
      navigate("/adminHome");
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to add vendor");
    }
  };

  const goBack = () => {
    navigate('/adminHome')
  }

  return (
    <div className="h-[90vh] flex items-center relative">
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
      <div className="w-[500px] m-auto">
        <div className="bg-orange-300 rounded-xl py-4 px-5">
          <h1 className="text-[30px] text-center font-bold">Add Vendors</h1>
          <form onSubmit={handleSubmit} className="text-xl">
            <div className="my-2">
              <label>Vendor's Name: </label>
              <input
                className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
                type="text"
                name="vendors"
                value={formData.vendors}
                placeholder="Enter vendor's name..."
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <label>Phone No.: </label>
              <input
                className="w-full rounded-lg text-lg focus:border-b-2 border-orange-600 outline-none p-2 bg-orange-200 my-1"
                type="number"
                name="phone"
                value={formData.phone}
                placeholder="Enter phone number..."
                onChange={handleChange}
              />
            </div>
            {err && <p style={{ color: "red" }}>{err}</p>}
            <div className="max-w-[150px] w-auto m-auto text-lg">
              <button
                className="bg-orange-200 px-5 font-semibold rounded-lg hover:bg-orange-500 hover:text-white py-2"
                type="submit"
              >
                Add Vendor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
