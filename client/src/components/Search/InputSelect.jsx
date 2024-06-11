import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";

import "./style.css";

export default function InputSelect() {
  const [animalType, setAnimalType] = React.useState("");

  const handleChange = (event) => {
    setAnimalType(event.target.value);
  };
  return (
    <>
      <Box id='animal-type' sx={{ width: "75%" }}>
        <FormControl fullWidth>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={animalType}
            label='Animal Type'
            displayEmpty
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value=''>
              <em>Select Animal Type</em>
            </MenuItem>
            <MenuItem value={"DOG"}>Dog</MenuItem>
            <MenuItem value={"CAT"}>Cat</MenuItem>
            <MenuItem value={"BIRD"}>Bird</MenuItem>
            <MenuItem value={"FERRET"}>Ferret</MenuItem>
            <MenuItem value={"FISH"}>Fish</MenuItem>
            <MenuItem value={"FROG"}>Frog</MenuItem>
            <MenuItem value={"GP"}>Guinea Pig</MenuItem>
            <MenuItem value={"Hamster"}>Hamster</MenuItem>
            <MenuItem value={"Hedgehog"}>Hedgehog</MenuItem>
            <MenuItem value={"Rabbit"}>Snake</MenuItem>
            <MenuItem value={"Snake"}>Other</MenuItem>
            <MenuItem value={"Hedgehog"}>Hedgehog</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton color='primary' sx={{ p: "10px" }} aria-label='directions'>
        <ArrowCircleRight />
      </IconButton>
    </>
  );
}
