import { Home } from "@mui/icons-material";
import { useRouteError } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PageNotFound = () => {
  const error = useRouteError();
  return (
    <Paper
      sx={{
        backgroundColor: (t) => t.palette.background.default,
        margin: 0,
        height: `calc(100vh - 64px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: `100%`,
        }}
      >
        <Typography variant='h4'>404</Typography>
        <p>Sorry, an error has occured</p>
        <o>
          <i>{error.statusText || error.message}</i>
        </o>
        <Button
          color='secondary'
          aria-label='home'
          href='/'
          style={{ marginTop: 20 }}
        >
          <Home />
        </Button>
      </div>
    </Paper>
  );
};

export default PageNotFound;
