import React from "react";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import {AuthContext} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
const UserInfo = (props) => {
  
 if (props.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto">
      <table className="w-full table-detail">
        <tbody>
          {[
            { label: "Username", value: props.userInfo.username },
            { label: "Full Name", value: props.userInfo.fullName },
            { label: "Email", value: props.userInfo.email },
            { label: "Phone", value: props.userInfo.phoneNum },
          ]
            .filter((row) => row.value) // Chỉ giữ lại các giá trị truthy (loại bỏ null, undefined, "")
            .map((row, index) => (
              <tr key={index}>
                <th>{row.label}</th>
                <td>{row.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
