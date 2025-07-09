import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IonIcon from "@reacticons/ionicons";
import TextField from "@mui/material/TextField";

const ProductFilter = ({ filters, onFilterChange }) => {
  const handleFilterChange = (type, value) => {
    let newFilters = { ...filters };

    if (type === "category") {
      if (newFilters.category.includes(value)) {
        newFilters.category = newFilters.category.filter((v) => v !== value);
      } else {
        newFilters.category.push(value);
      }
    }

    onFilterChange(newFilters);
  }

  return (
    <div className="font-content">
      <div className="flex items-center my-5">
        <IonIcon name="filter-outline"></IonIcon>
        <h1 className="text-2xl pl-3">Product Filter</h1>
      </div>

      <div className="pb-3">
        <h1 className="font-semibold">By category</h1>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="default"
                checked={filters.category.includes("1")}
                onChange={() => handleFilterChange("category", "1")}
              />
            }
            label="Manga"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="default"
                checked={filters.category.includes("4")}
                onChange={() => handleFilterChange("category", "4")}
              />
            }
            label="Figure"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="default"
                checked={filters.category.includes("3")}
                onChange={() => handleFilterChange("category", "3")}
              />
            }
            label="Clothes and Accessories"
          />
        </FormGroup>
      </div>
      <div>
        <h1 className="font-semibold pb-2">Price range</h1>
        <div className="flex items-center gap-3">
          <TextField
            id="outlined-basic"
            label="min"
            variant="outlined"
            size="small"
            color="standard"
          />
          <p>-</p>
          <TextField
            id="outlined-basic"
            label="max"
            variant="outlined"
            size="small"
            color="standard"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
