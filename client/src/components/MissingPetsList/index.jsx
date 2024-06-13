//TODO: remove missing pets 
import { useQuery } from "@apollo/client";
import { QUERY_MISSING_PETS } from "../../utils/queries";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { CardMedia, IconButton } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";
import ContentPaste from "@mui/icons-material/ContentPaste";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const MissingPetsList = () => {
  const { loading, error, data } = useQuery(QUERY_MISSING_PETS);
  const [copiedArray, setCopiedArray] = useState([]); // Track whether copy was successful for each pet

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const missingPets = data.petsByMissing;
  console.log(missingPets);

  const handleCopy = (index) => {
    // Create a copy of the current `copiedArray` and set the specific index to `true`
    const updatedCopiedArray = [...copiedArray];
    updatedCopiedArray[index] = true;
    setCopiedArray(updatedCopiedArray);
    // Schedule the change back to ContentPaste after 10 seconds
    setTimeout(() => {
      const resetCopiedArray = [...copiedArray];
      resetCopiedArray[index] = false;
      setCopiedArray(resetCopiedArray);
    }, 2000);
  };

  if (!missingPets || !missingPets.length) {
    return (
      <Typography variant='h5'>
        {/* No missing pets in your area! Awesome! */}
      </Typography>
    );
  }

  const cardStyle = {
    backgroundImage: `url('../../src/assets/images/SVG/${missingPets.image}')`,
    backgroundSize: "cover",
    color: "white",
    marginBottom: "16px",
    borderRadius: "50px",
    boxShadow: "unset",
  };

  const cardContentStyle = {
    backgroundColor: "rgb(240 244 248 / 70%)",
    padding: "16px",
    bottom: "39px",
    margin: "auto",
    position: "relative",
    borderRadius: "65px",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(0, 0, 0, 0.54)",
    color: "black",
  };

  const cardMediaStyle = {
    objectFit: "unset",
    backgroundColor: "pink",
    borderRadius: "60px",
  };

  return (
    <Grid container spacing={2} id='missing-list'>
      {missingPets.map((pet, index) => (
        <Grid item xs={9} sm={8} md={5} lg={3} key={pet._id}>
          <Card style={cardStyle}>
            <CardMedia
              component='img'
              height='194'
              image={`../../src/assets/images/SVG/${pet.image}`}
              alt='Pet Image'
              style={cardMediaStyle}
            />{" "}
            <CardContent
              style={cardContentStyle}
              src={`../../src/assets/images/SVG/${pet.image}`}
            >
              <Typography variant='h5' gutterBottom align='center'>
                {pet.petName}
              </Typography>
              <Typography variant='subtitle1'>
                Owner:{" "}
                <Link
                  to={`/profile/${pet.petOwner ? pet.petOwner._id : ""}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {pet.petOwnerUsername}
                </Link>
              </Typography>
              <Typography variant='body1'>{pet.description}</Typography>
              <Typography variant='body1'>
                <Link to='https://www.petmicrochiplookup.org/'>
                  Lookup Chip
                </Link>
                : {pet.microchipNumber}
                <CopyToClipboard
                  text={pet.microchipNumber}
                  onCopy={() => handleCopy(index)} // Set copied state to true on copy
                >
                  <IconButton aria-label='delete'>
                    {copiedArray[index] ? (
                      <AssignmentTurnedInIcon />
                    ) : (
                      <ContentPaste />
                    )}
                  </IconButton>
                </CopyToClipboard>
              </Typography>

              <Button
                component={Link}
                to={`/pet/${pet._id}`}
                variant='outlined'
                style={{
                  color: "rgba(0, 0, 0, 0.54)",
                  borderColor: "rgba(0, 0, 0, 0.54)",
                  width: "80%",
                  alignSelf: "center",
                }}
              >
                Join Search
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MissingPetsList;
