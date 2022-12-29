import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReviewFlow from './ReviewFlow';
import ResultsPage from './ResultsPage';
import axios from 'axios';

const steps = ['Details', 'Results'];


const theme = createTheme();

export default function FormInput() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [resultsCount, setResultsCount] = React.useState<string | number>(10);
  const [gender, setGender] = React.useState('female');
  const [values, setValues] = React.useState<string[]>([]);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (<ReviewFlow
          gender={gender}
          resultsCount={resultsCount}
          setResultsCount={setResultsCount}
          setGender={setGender}
        />);
      case 1:
        return <ResultsPage values={values} />;
      default:
        throw new Error('Unknown step');
    }
  }


  const fetchResults = async () => {
  const url = `https://azure-django-app.azurewebsites.net/names/?num_results=${resultsCount}&gender=${gender}`;
  try {
      const response = await axios.get(url);
      const data = await response.data;
      setValues(data.names_url);
    } catch (error) {
      console.error(error);
    }
  }

  const handleNext = () => {
    console.log(activeStep);
    if (activeStep == 0) {
      setActiveStep(activeStep + 1);
    }
    fetchResults();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            OneHeart
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Details
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Refresh' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}