import { ThemeProvider } from '@emotion/react';
import { Button, Container, createTheme, CssBaseline, TextField, Typography, FormControlLabel, Box, Checkbox, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { getToken, saveTokenAuth } from '../../services/login.service.jsx';
import { validarEmail } from '../../utils/utils.jsx';
import Mensajes from '../../lang/es-ES.json';

const theme = createTheme();

const LoginComponent = ({loginChange}) => {
  
  const [open, setOpen] = useState(false);
  const [errorE, setErrorE] = useState(false);
  const [errorP, setErrorP] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    if (email && password) {
      getToken(data.get('email'), data.get('password')).then(res => {
        if (res && res.token) {
          saveTokenAuth(res.token);
          loginChange();
        } else if (res && res.error) {
          setOpen(true);
        }
      }).catch(err => {
        setOpen(true);
      });
    }
  };

  const validateFields = (e) => {
    if (e.currentTarget.name == 'email') {
      if (!validarEmail(e.currentTarget.value)) {
        setErrorE(true);
        setErrorEmail(Mensajes.errors.email);
      } else {
        setErrorE(false);
        setErrorEmail('');
      }
    } 
    
    if(e.currentTarget.name === 'password') {
      if (e.currentTarget.value === '') {
        setErrorP(true);
        setErrorPass(Mensajes.errors.password);
      } else {
        setErrorP(false);
        setErrorPass('');
      }
    } 
  } 

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity="error" sx={{ width: '100%' }}>{Mensajes.errors.userNoValid}</Alert>
      </Snackbar>
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
            {Mensajes.login.title}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={errorE}
              margin="normal"
              required
              fullWidth
              id="email"
              label={Mensajes.login.email}
              name="email"
              autoComplete="email"
              autoFocus
              helperText={errorEmail}
              onChange={validateFields}
            />
            <TextField
              error={errorP}
              margin="normal"
              required
              fullWidth
              name="password"
              label={Mensajes.login.password}
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errorPass}
              onChange={validateFields}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={errorE || errorP}
            >
              {Mensajes.login.button}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginComponent;
