import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OrderHistory from "../components/OrderHistory";
import UserInfo from "../components/UserInfo";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";

const Profile = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token") !== null;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const [loading, setLoading] = useState(true);

  

  if (!isAuthenticated) {
    navigate("/login");
    return null; // Hoặc có thể trả về một thông báo khác nếu cần
  }

  return (
    <div className="mx-auto  p-4">
      <div className="page-container mt-8 ">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs"
            sx={{
              "& .MuiTab-root": {
                color: "gray", // màu chữ thường
              },
              "& .Mui-selected": {
                color: "black", // màu chữ tab đang chọn
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "gray", // màu gạch chân
              },
            }}
          >
            <Tab label="Order History" color="" />
            <Tab label="Profile" />
          </Tabs>
          <Box sx={{ p: 2 }}>
            {value === 0 && (
              <Box>
                <Typography component="div" sx={{ mt: 1 }}>
                  <OrderHistory />
                </Typography>
              </Box>
            )}
            {value === 1 && (
              <Box sx={{ mt: 1 }}>
                <UserInfo setLoading={setLoading} loading={loading} />
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
