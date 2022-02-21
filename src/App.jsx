import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import "./assets/css/App.css";
import LoginComponent from "./components/login";
import * as React from 'react';
import avatar from "./assets/imagenes/avatar.jpg";
import Tooltip from '@mui/material/Tooltip';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';


function App() {
  const [auth, setAuth] = React.useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const settings = ['Logout'];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const isLogin = false;

  const handleUserrender = () =>
    isLogin ? <LoginComponent /> : <Redirect to="/login" />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Prueba Proyecto React
          </Typography>
          {auth && (
            <div>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/users" />
          </Route>
          <Route path="/users" render={handleUserrender} />
          <Route
            path="/login"
            render={() => (!isLogin ? <LoginComponent /> : <Redirect to="/users" />)}
          />
        </Switch>
      </BrowserRouter>
    </Box>
  );
}

export default App;
