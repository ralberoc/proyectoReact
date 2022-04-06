import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline, Typography, Box } from '@mui/material';
import { getToken, saveTokenAuth } from '../../services/login.service.jsx';

const theme = createTheme();

const UserComponent = ({loginChange}) => {

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
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserComponent;
