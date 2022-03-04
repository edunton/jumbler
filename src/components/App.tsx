import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { translate } from '../translate';
import { Rng } from '../Rng';
import CopyToClipboard from './CopyToClipboard';

const rng = new Rng();

type CardType = {name: string, desciption?: string};

const constructDeck = (inputStr: string): CardType[] => {
  const deck : CardType[] = [
    {name:'Wild ♠ 🃏', desciption: 'any player including self'},{name:'Wild ♦ 🃏', desciption: 'any player including self'},
    {name:'Special ✋', desciption: 'most cards in hand (tie break to left)'},
    {name:'Special 🌪', desciption: 'fewest ships in warp (tie break to left)'},
    {name:'Special 🏫', desciption: 'most foreign colonies (tie break to left)'},
  ]
  const names = inputStr.split('\n').filter(Boolean).map(x => x.trim().toUpperCase()).filter(Boolean);
  for(let name of names){
    deck.push({name, desciption: '🌛 No Hazard'});
    deck.push({name, desciption: '🚀 No Hazard'});
    deck.push({name, desciption: '🔥 Hazard Warning!!!'});
  }

  const shuffled = rng.shuffle(deck);

  return shuffled;
}

export const App = () => {
  const [input, setInput] = React.useState('');
  const [cards, setCards] = React.useState<CardType[]>([]);
  const [pointer, setPointer] = React.useState(-1);

  const handleReshuffle = () => {
    const deck = constructDeck(input);
    setCards(deck);
    setPointer(-1);
  }

  const handleNext = () => {
    const next = pointer + 1;
    if (next >= cards.length){
      handleReshuffle();
      setPointer(0);
      return;
    }

    setPointer(next);
  }

  React.useEffect(() => {
    handleReshuffle();
  }, [input]);

  const card = cards[pointer];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Destiny Deck
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
            onClick={handleReshuffle}
            color="primary"
            variant="contained"
            fullWidth
          >
            Reshuffle
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
            {!!card && <>
              <Typography variant='h3'>{card.name}</Typography>
              {!!card.desciption && <Typography variant='h5'>{card.desciption}</Typography>}
            </>}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleNext}
            color="primary"
            variant="contained"
            fullWidth
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
