import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";

const InputType = ({ onSelectChange }) => {
  return (
    <>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={"Please type " + onSelectChange}
        inputProps={{ "aria-label": "Dynamic Search" }}
        className='hidden-xs'
      />
      <IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton color='primary' sx={{ p: "10px" }} aria-label='directions'>
        <ArrowCircleRight />
      </IconButton>
    </>
  );
};

export default InputType;
