import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getItems } from "../../SERVICES/itemsAPI";
import '../../App.css';
import { getStock } from "../../SERVICES/stockApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(255, 131, 86)',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    textAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgb(255, 224, 199)',
    textAlign: 'center',
  },
}));

export const AdminHome = () => {

const [getData, setGetData] = useState([]);
const [stock, setStock] = useState([])

useEffect( () => {
  getItems().then((resp) => {
    setGetData(resp.data);
  })
}, []);

useEffect( () => {
  getStock().then( (res) => {
    setStock(res.data);
  })
}, [])

  return (
    <div className='overflow-y-auto overflow-x-hidden'>

      {/* ORDER HISTORY */}
      <div className="my-3 w-[1080px] m-auto">
        <h1 className="text-center text-[36px] font-bold">Order History: </h1>
        <TableContainer className="" component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="tr">
                <StyledTableCell>Recipe Name</StyledTableCell>
                <StyledTableCell>Manager Name </StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {getData?.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.itemNm}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.vendorNm}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.date}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </div>

      <div className="w-full mt-7 h-[2px] bg-orange-600"></div>

      {/* STOCK DATA */}
      <div className="my-3 w-[800px] m-auto">
        <h1 className="text-center text-[36px] font-bold">Stock Data: </h1>
        <TableContainer className="" component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="tr">
                <StyledTableCell>Ingridients</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Quantity Used</StyledTableCell>
                <StyledTableCell>Quantity Left</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stock?.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.itemNm}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.stockBuyed} ({row.weight})
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.stockUsed}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.stockRemain}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="w-full mt-7 h-[2px] bg-orange-600"></div>

      {/* Purchased Items HISTORY */}
      <div className="my-3 w-[1080px] m-auto">
        <h1 className="text-center text-[36px] font-bold">Purchased Items History: </h1>
        <TableContainer className="" component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="tr">
                <StyledTableCell>Purchased Ingridients</StyledTableCell>
                <StyledTableCell>Quantity </StyledTableCell>
                <StyledTableCell>Vendor's Name</StyledTableCell>
                <StyledTableCell>Date of purchasing</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getData?.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.itemNm}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.quantity} ({row.weight})
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.vendorNm}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.date}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
