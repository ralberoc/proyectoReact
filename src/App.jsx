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
import UserComponent from "./components/users";
import avatar from "./assets/imagenes/avatar.jpg";
import Tooltip from '@mui/material/Tooltip';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { deleteTokenAuth, readTokenAuth } from "./services/login.service";
import React, { useState } from 'react';


function App() {

  const [isLogin, setIslogin] = useState(readTokenAuth() );
  const settings = ['Logout'];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseUserMenu = () => {
    console.log('cerrar');
    setAnchorElUser(null);
  };

  const handleDeleteLogin = () => {
    console.log('eliminar sesion');
    setAnchorElUser(null);
    deleteTokenAuth();
    handleLoginChange();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log('open');
    setAnchorElUser(event.currentTarget);
  };

  const handleLoginChange = ()=>{
    setIslogin(readTokenAuth());
 };

  const handleUserrender = () =>
    isLogin ? <UserComponent loginChange={handleLoginChange}/> : <Redirect to="/login" />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Prueba Proyecto React
          </Typography>
          {isLogin && (
            <div>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
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
                  <MenuItem key={setting} onClick={handleDeleteLogin}>
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
            render={() => (!isLogin ? <LoginComponent loginChange={handleLoginChange}/> : <Redirect to="/users" />)}
          />
        </Switch>
      </BrowserRouter>
    </Box>
  );
}

export default App;
