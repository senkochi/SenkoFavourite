import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import OrderDetailCard from "./OrderDetailCard";
import axiosInstance from "../utils/axiosInstance";

const DialogPop = (props) => {

  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
      maxHeight: '70vh', // Giới hạn chiều cao tối đa của nội dung (ví dụ: 70% chiều cao viewport)
      overflowY: 'auto', // Thêm thanh cuộn dọc khi nội dung tràn
    },
    "& .MuiDialogActions-root": { 
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const fetchOrderHistory = async () => {
      setLoading(true);
      const response = await axiosInstance.get(`/api/order/detail/${props.orderId}`);
      if (response.status !== 200) {
        console.error('Failed to fetch order history');
        setLoading(false);
        return;
      }
      const data = response.data;
      setOrders(data);
      setLoading(false);
    };

    fetchOrderHistory();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        View
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Order Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <div>
          <h2 className="mx-5">Address : <span>{props.address}</span></h2>
              <OrderDetailCard className='w-full' orders={orders} />
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DialogPop;
