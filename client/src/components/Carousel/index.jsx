import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import Carousel from '@mui/material/Carousel';

import animal1 from '../../assets/images/cat2.jpg';
import animal2 from '../../assets/images/dog1.jpg';
import animal3 from '../../assets/images/dog2.jpg';
import animal4 from '../../assets/images/cat3.jpg';

const images = [
  {
    label: '1',
    imgPath: animal1,
  },
  {
    label: '2',
    imgPath: animal2,
  },
  {
    label: '3',
    imgPath: animal3,
  },
  {
    label: '4',
    imgPath: animal4,
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1
    );
  };

  return (
    <Box sx={{ maxWidth: 1800, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50, // Adjust height as needed
          pl: 2, // Adjust padding as needed
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      {/* <Carousel
        index={activeStep}
        onChange={(index) => setActiveStep(index)}
        animation="slide"
        sx={{ height: 700, maxWidth: 2500, width: 2000 }} // Adjust dimensions as needed
      > */}
        {images.map((step) => (
          <Box
            key={step.label}
            sx={{
              height: 700, // Adjust height as needed
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={step.imgPath}
              alt={step.label}
              style={{ maxWidth: '100%', maxHeight: '100%' }} // Ensure the image fits within the container
            />
          </Box>
        ))}
      {/* </Carousel> */}
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
