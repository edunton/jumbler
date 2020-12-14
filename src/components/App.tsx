import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { translate } from '../translate';
import { Rng } from '../Rng';
import CopyToClipboard from './CopyToClipboard';

const rng = new Rng();

const MIN_ROWS = 3;
export const App = () => {
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState('');
  const [seed, setSeed] = React.useState(() => rng.nextInt());

  React.useEffect(() => {
    setResult(translate(seed)(input));
  }, [input, seed]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Word Jumble
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Input"
            multiline
            variant="outlined"
            value={input}
            onChange={e => setInput(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => setSeed(rng.nextInt())}
            color="primary"
            variant="contained"
            fullWidth
          >
            Re-jumble
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Jumble Text"
            multiline
            variant="outlined"
            value={result}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <CopyToClipboard
            render={({ copy }) => (
              <Button
                onClick={() => copy(result)}
                color="primary"
                variant="contained"
                fullWidth
              >
                Copy to Clipboard
              </Button>
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
