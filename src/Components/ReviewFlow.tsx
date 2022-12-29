import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, FormLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';

type propTypes = {
  gender: string,
  resultsCount: string | number,
  setGender: any,
  setResultsCount: any,
};

const ReviewFlow = (props: propTypes): React.FunctionComponentElement<propTypes> => {
  const {
    setResultsCount,
    setGender,
    resultsCount,
    gender,
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Find unique name for your soul
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              // aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" disabled />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"># of Names</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={resultsCount}
              label="Age"
              onChange={(e) => setResultsCount(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={50}>Fifty</MenuItem>
              <MenuItem value={100}>Hundred</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ReviewFlow;
