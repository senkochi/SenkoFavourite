import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Overall from "./Overall";
import Feedbacks from "./Feedbacks";
import Rating from "@mui/material/Rating";
import formatDate from "../../utils/dateFormat";

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
              {product.feedbacks.length > 0 ? (
                product.feedbacks.map((fbs, idx) => (
                  <div key={idx} className="w-full max-w-6xl px-4">
                    <article>
                      <div className="flex items-center mb-4">
                        <img
                          className="w-10 h-10 me-4 rounded-full"
                          src={fbs.user.imgURL}
                          alt=""
                        />

                        <div className="font-medium dark:text-white">
                          <p>
                            {fbs.user.fullName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                        <Rating
                name="text-feedback"
                value={fbs.rating}
                readOnly
                precision={0.5}
              />
                      </div>
                      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          {formatDate(fbs.createdAt)}
                        </p>
                      </footer>
                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {fbs.content}
                      </p>
                      <a
                        href="#"
                        className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Read more
                      </a>
                    </article>
                  </div>
                ))
              ) : (
                <Typography>No ratings available for this product.</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default DetailAndFeedback;
