import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Dropdown from "./Dropdown";
import InputSelect from "./InputSelect";
import InputType from "./InputType";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@apollo/client";
import { QUERY_PETS } from "../../utils/queries";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
export default function Search() {
  const [selectedOption, setSelectedOption] = useState("Name");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const { loading, error, data } = useQuery(QUERY_PETS);

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };
  // Add an event listener to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
      // console.log("Window width:", window.innerWidth); // Add this line
    };

    // Add the event listener
    window.addEventListener("resize", handleResize);
    // console.log("listener added");

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      // console.log("listener removed");
    };
  }, []);
  const test = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!test) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        if (data && data.pets) {
          // console.log("Pet Description" + JSON.stringify(data.pets));
          const searchOptions = data.pets.map((pet) => ({
            title: pet.description, // Replace with the actual property containing option text
          }));
          setOptions(searchOptions);
          // console.log("search options:" + JSON.stringify(searchOptions));
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [data, test]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // const petsSearchList = data.pets;
  // console.log("pets:" + petsSearchList);

  return (
    <div id='description-search'>
      {isSmallScreen ? (
        <Autocomplete
          sx={{ width: 300 }}
          id='auto-complete'
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title || ""}
          options={options.map((option) => ({
            ...option,
            key: `${option.title}`,
          }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Description'
              id='text-field'
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      ) : (
        <>
          {" "}
          <Paper
            component='form'
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              height: 50,
            }}
          >
            <div>
              <Dropdown onSelectChange={handleDropdownChange} />
            </div>
            {selectedOption !== "Animal Type" && (
              <InputType onSelectChange={selectedOption} />
            )}
            {selectedOption === "Animal Type" && <InputSelect />}
          </Paper>
        </>
      )}
    </div>
  );
}
