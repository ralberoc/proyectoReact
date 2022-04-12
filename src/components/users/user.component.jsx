import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline, Typography, Box, Card, CardMedia, CardContent, Grid, Stack, Pagination, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchUserList } from '../../services/users.service.jsx';
import Mensajes from '../../lang/es-ES.json';

const theme = createTheme();

const UserComponent = ({loginChange}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { 
    getUsers(1);
  },[]);

  const getUsers = (numFila) => {
    setLoading(true);
    fetchUserList(numFila).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      setOpen(true);
    });
  };

  const paginacion = (e, newPage) => {
    getUsers(newPage);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
        <Alert severity="error" sx={{ width: '100%' }}>{Mensajes.errors.conection}</Alert>
      </Snackbar>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {Mensajes.users.title}
          </Typography>
          <Container sx={{ py: 12 }} maxWidth="md">
            <Grid container spacing={4}>
              {data.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: "#1976d2" }}>
                  <CardMedia
                    sx={{height: '50%'}}
                    component="img"
                    image={card.avatar}
                    alt={card.first_name + ' ' + card.last_name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" color="#FFFFFF">
                      {card.first_name + ' ' + card.last_name}
                    </Typography>
                    <Typography color="#FFFFFF">
                      {Mensajes.users.email}{card.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>     
              ))}
            </Grid>
          </Container>
          <Stack spacing={2} direction="row">
            <Pagination count={2} variant="outlined" color="primary" onChange={paginacion}/>
          </Stack>
        </Box>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
          <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
};

export default UserComponent;
