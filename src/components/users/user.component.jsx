import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline, Typography, Box, Card, CardMedia, CardContent, Button, CardActionArea, Grid, CardActions, Stack, Pagination, Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchUserList } from '../../services/users.service.jsx';

const theme = createTheme();

const UserComponent = ({loginChange}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    getUsers(1);
  },[]);

  const getUsers = (numFila) => {
    setLoading(true);
    fetchUserList(numFila).then(res => {
      setData(res.data);
      setLoading(false);
    });
  };

  const paginacion = (e, newPage) => {
    getUsers(newPage);
  };

  return (
    <ThemeProvider theme={theme}>
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
            Usuarios
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
                      Email: {card.email}
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
