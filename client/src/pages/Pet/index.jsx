import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PET } from "../../utils/queries";
import { ADD_POST, REMOVE_POST } from "../../utils/mutations";
import { Link } from "react-router-dom";
import "./style.css";
import Typography from "@mui/material/Typography";
import Map from "../../components/Map";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentPaste from "@mui/icons-material/ContentPaste";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useState } from "react";

const Pet = () => {
  const [copySuccess, setCopySuccess] = useState([]); // Track whether copy was successful for each pet
  const [postContent, setPostContent] = useState("");

  const { petId } = useParams();
  console.log("param = " + JSON.stringify(petId));
  const { loading, error, data, refetch } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId },
  });
  console.log("fetched data = " + JSON.stringify(data));
  const petData = data?.pet;
  console.log("stored data = " + JSON.stringify(petData));
  const [addPost] = useMutation(ADD_POST, {
    onCompleted: () => {
      refetch();
    },
  });
  const [removePost] = useMutation(REMOVE_POST);
  const [removeMarker] = useMutation(REMOVE_POST);

  const handleRemovePost = async (postId) => {
    try {
      const { data } = await removePost({
        variables: { postId },
      });

      console.log("Post deleted:", data.removePost);

      refetch();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addPost({
        variables: { petId, postContent },
      });

      // Handle the successful response, e.g., show a success message or reset the form
      console.log("Post added:", data.addPost);

      // Reset the form
      setPostContent("");
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Error adding post:", error);
    }
  };

  const handleRemoveMarker = async (markerId) => {
    try {
      const { data } = await removeMarker({
        variables: { markerId },
      });

      console.log("Marker deleted:", data.removeMarker);

      refetch();
    } catch (error) {
      console.error("Error deleting marker:", error);
    }
  };
  // const { markerId } = pet.markers;

  // const { markerLoading, markerError, markerData } = useQuery(
  //   QUERY_MARKER_BY_ID,
  //   { variables: { markerId } }
  // );

  // const marker = markerData?.marker;

  // logging empty object {}
  // console.log("Marker data" + JSON.stringify({ markerData }));
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const cardStyle = {
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
    lineHeight: "1.5",
  };

  const handleCopy = () => {
    // Create a copy of the current `copiedArray` and set the specific index to `true`
    setCopySuccess(true);
    // Schedule the change back to ContentPaste after 10 seconds
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  console.log("pet" + JSON.stringify(petData));

  return (
    <div>
      <div id='pet-top'>
        <div id='top-left'>
          <div className='flexbox-turn-on'>
            <div id='pet-info'>
              {" "}
              {petData.image ? (
                <img
                  src={`../../src/assets/images/SVG/${petData.image}`}
                  className='petImage'
                  alt='Missing Pet'
                ></img>
              ) : (
                <img
                  src='../../src/assets/images/SVG/hedgehog-01-front.svg'
                  alt='Missing Pet'
                ></img>
              )}{" "}
              <Card style={cardStyle}>
                <Typography variant='h5' gutterBottom align='center'>
                  {petData.petName}
                </Typography>
                <div id='line-height'>
                  <CardContent style={cardContentStyle}>
                    <p>Description: {petData.description}</p>
                    <p>Animal Type: {petData.animalType}</p>
                    <p>Is Missing: {petData.isMissing ? "Yes" : "No"}</p>
                    <Typography variant='subtitle1'>
                      Owner:{" "}
                      <Link
                        to={`/profile/${
                          petData.petOwner ? petData.petOwner._id : ""
                        }`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {petData.petOwnerUsername}
                      </Link>
                      <>
                        <>
                          <Typography variant='body1'>
                            <a
                              href='https://www.petmicrochiplookup.org/'
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              Lookup Chip
                            </a>
                            : {petData.microchipNumber}
                            <CopyToClipboard
                              text={petData.microchipNumber}
                              onCopy={() => handleCopy()} // Set copied state to true on copy
                            >
                              <IconButton aria-label='delete'>
                                {copySuccess ? (
                                  <AssignmentTurnedInIcon />
                                ) : (
                                  <ContentPaste />
                                )}
                              </IconButton>
                            </CopyToClipboard>
                          </Typography>
                        </>
                      </>
                    </Typography>
                  </CardContent>{" "}
                </div>
              </Card>{" "}
            </div>
          </div>
        </div>

        <div id='top-right'>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            id='pet-chat'
          >
            <List dense>
              {petData &&
                petData.posts &&
                petData.posts.map((post) => (
                  <>
                    {" "}
                    <ListItem
                      className='posts'
                      secondaryAction={
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={() => handleRemovePost(post._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={post._id} />
                      <ListItemText
                        primary='Username'
                        secondary='Example Text Content'
                      />
                    </ListItem>
                    <Divider />{" "}
                  </>
                ))}
            </List>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='postContent'>Post Content:</label>
                <textarea
                  id='postContent'
                  name='postContent'
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  required
                />
              </div>
              <button type='submit'>Add Post</button>
            </form>
          </Box>
        </div>
      </div>
      <div id='pet-bottom'>
        <div id='bottom-left'>
          <Map />
        </div>
        <div id='bottom-right'>
          <List dense>
            {petData.markers &&
              petData.markers.map((marker, index) => (
                <>
                  <ListItem
                    className='markers'
                    key={marker._id}
                    secondaryAction={
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleRemoveMarker(marker._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    {/* Possible fix = removing marker for the index? */}
                    <ListItemText primary={marker[index] + 1} />{" "}
                    <ListItemText primary={marker._id} />
                    <ListItemText
                      primary='Username'
                      secondary='Marker Name'
                    />{" "}
                  </ListItem>
                </>
              ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Pet;
