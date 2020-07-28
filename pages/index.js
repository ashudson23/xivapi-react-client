import React from 'react';
import { useForm } from "react-hook-form";

import { Alert } from '@material-ui/lab';
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Container,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';

const servers = [
  'Lich',
  'Odin',
  'Phoenix',
  'Shiva',
  'Twintania',
  'Zodiark',
];

const getData = ({}, ms = 3000) => new Promise(resolve => {
  // pseudo fetch for now add react graph client later
  const data = [{ name: "anthony", server: "phoenix" }];

  setTimeout(() => resolve({ data }), ms)
});

export default () => {
  const { register, handleSubmit } = useForm();

  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async form => {
    console.log('form', form)
    setError(null);
    setLoading(true);

    try {
      const { player, server } = form;
      const { data } = await getData({ player, server });
      setData(data);
    } catch (err) {
      setError("There was an oopsie");
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Typography component="h1" variant="h5">
        Search player
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              inputRef={register}
              fullWidth
              id="player"
              label="Player"
              name="player"
              autoComplete="player"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="server">Server</InputLabel>
              <Select
                native
                inputRef={register}
                inputProps={{
                  name: 'server',
                  id: 'server',
                }}
              >
                <option></option>
                {
                  servers.map(server => (
                    <option
                      key={server}
                      value={server.toLowerCase()}
                    >
                      {server}
                    </option>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        { error && (
          <Alert severity="error">
            { error }
          </Alert>
        )}
        <Grid container justify="space-between">
          <Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress color="secondary" size={15} />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      { data && (
        <TableContainer component={Paper}>
          <Table aria-label="player search results">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Server</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={`${row.name}-${row.server}`}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.server}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
