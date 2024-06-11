import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_PET } from "../../utils/mutations";
import { QUERY_PETS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const PetForm = () => {
  const [petName, setPetName] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [description, setDescription] = useState("");
  const [microchipRegistry, setMicrochipRegistry] = useState("");
  const [microchipNumber, setMicrochipNumber] = useState("");
  const [isMissing, setIsMissing] = useState(false);

  const [addPet, { error }] = useMutation(ADD_PET, {
    refetchQueries: [QUERY_PETS, "getPets", QUERY_ME, "me"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const authenticatedPerson = Auth.getProfile()?.authenticatedPerson;
      if (!authenticatedPerson) {
        // Handle the case where authenticatedPerson is undefined
        // You can show an error message or take appropriate action

        return;
      }

      const { data } = await addPet({
        variables: {
          petName,
          animalType,
          description,
          microchipRegistry,
          microchipNumber,
          isMissing,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username
          petOwner: data.username,
        },
      });

      setPetName("");
      setAnimalType("DOG");
      setDescription("");
      setMicrochipRegistry("");
      setMicrochipNumber("");
      setIsMissing(false);
      // console.log("data" + { data });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "petName") {
      setPetName(value);
    }
    if (name === "animalType") {
      setAnimalType(value);
    }
    if (name === "description") {
      setDescription(value);
    }
    if (name === "microchipRegistry") {
      setMicrochipRegistry(value);
    }
    if (name === "microchipNumber") {
      setMicrochipNumber(value);
    }
    if (name === "isMissing") {
      setIsMissing(event.target.checked);
    }
  };

  // setup menu items for animalType enum values
  const animalTypes = [
    "DOG",
    "CAT",
    "BIRD",
    "FERRET",
    "FISH",
    "FROG",
    "GP",
    "HAMSTER",
    "HEDGEHOG",
    "RABBIT",
    "SNAKE",
    "OTHER",
  ];

  const menuItems = animalTypes.map((animalType) => (
    <MenuItem key={animalType} value={animalType}>
      {animalType}
    </MenuItem>
  ));

  return (
    <div>
      <h3>Add a Pet</h3>

      {Auth.loggedIn() ? (
        <>
          <Box
            component='form'
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete='off'
            onSubmit={handleFormSubmit}
          >
            <div>
              <TextField
                name='petName'
                placeholder="Pet's Name"
                value={petName}
                onChange={handleChange}
              />
              {/* description */}
              <TextField
                name='description'
                placeholder='Description'
                value={description}
                onChange={handleChange}
              />
              {/* microchipRegistry */}
              <TextField
                name='microchipRegistry'
                placeholder='Microchip Registry'
                value={microchipRegistry}
                onChange={handleChange}
              />
              {/* microchipNumber */}
              <TextField
                name='microchipNumber'
                placeholder='Microchip Number'
                value={microchipNumber}
                onChange={handleChange}
              />
              {/* animalType */}
              <FormControl fullWidth>
                <InputLabel>Select Animal Type</InputLabel>
                <Select>{menuItems}</Select>
                <p>{animalType}</p>
              </FormControl>
              {/* isMissing */}
              <FormControlLabel
                control={
                  <Switch
                    name='isMissing'
                    checked={isMissing}
                    onChange={handleChange}
                  />
                }
                label='Missing'
              />
            </div>

            <div className='col-12 col-lg-3'>
              <Button
                type='submit'
                disabled={
                  !petName ||
                  !animalType ||
                  !description ||
                  !microchipRegistry ||
                  !microchipNumber ||
                  !isMissing
                }
              >
                Add Pet
              </Button>
            </div>
            {error && (
              <div className='col-12 my-3 bg-danger text-white p-3'>
                {error.message}
              </div>
            )}
          </Box>
        </>
      ) : (
        <p>
          You need to be logged in to share your pets. Please{" "}
          <Link to='/login'>login</Link> or <Link to='/signup'>signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PetForm;
