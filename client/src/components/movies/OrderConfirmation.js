import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const OrderConfirmation = ({selectedSeat, selectedSnacks, showPrice, total}) => {
console.log("order confirmation: ", selectedSeat)
  const moneyFormat = (money) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(money);
};
  return (
    <>
    <TableContainer component={Paper}>
      qưdqw
    </TableContainer>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedSeat.map((seat) => (
            <TableRow key={seat.seatId}>
              <TableCell>Seat {seat.seatName}</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">{moneyFormat(seat.seatPrice + showPrice)}</TableCell>
            </TableRow>
          ))}
          {Object.values(selectedSnacks).map((snack) => (
            <TableRow key={snack.itemId}>
              <TableCell>{snack.itemName}</TableCell>
              <TableCell align="right">{snack.quantity}</TableCell>
              <TableCell align="right">{moneyFormat(snack.price * snack.quantity)}</TableCell>
            </TableRow>
          ))}
            <TableCell rowSpan={3} />
          <TableRow>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell align="right">{moneyFormat(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default OrderConfirmation