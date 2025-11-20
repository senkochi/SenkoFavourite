import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <div className='flex items-center justify-between gap-13'>
          <div>
            <img className="w-[40px] h-[60px] object-scale-down object-top"
              src="https://via.placeholder.com/400x600" // Placeholder image URL
              alt="Product Image"
            />
          </div>
          <div>
            <h2>{props.order.productName}</h2>
          </div>
          <div>
            <p>{props.order.price}</p>
          </div>
          <div>
            <p>{props.order.quantity}</p>
          </div>
          <div>
            <p>Total: {props.order.total}</p>
          </div>
        </div> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Price&nbsp;(USD)</TableCell>
                <TableCell align="right">Quantity&nbsp;(Units)</TableCell>
                <TableCell align="right">Total&nbsp;(USD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="w-[40px] h-[60px] object-scale-down object-top">
                      <img src={order.imgURL} alt={order.productName} />
                    </div>
                  </TableCell>
                  <TableCell align="right">{order.productName}</TableCell>
                  <TableCell align="right">{order.price}</TableCell>
                  <TableCell align="right">{order.quantity}</TableCell>
                  <TableCell align="right">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
