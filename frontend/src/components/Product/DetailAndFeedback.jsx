import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Overall from "./Overall";
import Feedbacks from "./Feedbacks";

const DetailAndFeedback = ({ product }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="my-5">
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
          <Tab label="Product Information" color="" />
          <Tab label="Ratings" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {value === 0 && (
            <Box>
              <Typography component="div" sx={{ mt: 1 }}>
                <table className="w-full table-detail">
                  <tbody>
                    {[
                      {
                        label: "Manufacturer",
                        value: product.manufacturerName,
                      },
                      { label: "Artist", value: product.artist },
                      { label: "Release date", value: product.releaseDate },
                      { label: "Size", value: product.size },
                      { label: "Material", value: product.material },
                      { label: "Copyright", value: product.copyRight },
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
              </Typography>
            </Box>
          )}
          {value === 1 && (
            <Box sx={{ mt: 1 }}>
              <Feedbacks />
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default DetailAndFeedback;
