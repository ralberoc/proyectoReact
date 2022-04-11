import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline, Typography, Box, Card, CardMedia, CardActions, CardContent, Button, CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchUserList } from '../../services/users.service.jsx';

const theme = createTheme();

const UserComponent = ({loginChange}) => {

  const [data, setData] = useState([]);

  useEffect(() => { 
    fetchUserList(1).then(res => {
      console.log(res);
      setData(res.data);
    });
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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

        {data.map((card) => (
          <Card key={card.id} sx={{ maxWidth: 345 , backgroundColor: "#1976d2"}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={card.avatar}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="#FFFFFF">
                  {card.first_name + ' ' + card.last_name}
                </Typography>
                <Typography variant="body2" color="#FFFFFF">
                  Email: {card.email}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card> 
        ))}

        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserComponent;
