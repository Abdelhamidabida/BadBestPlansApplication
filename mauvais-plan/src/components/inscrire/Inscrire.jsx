import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from '../../menu/Menu';
import "./Inscrire.css";
import { Link, Navigate, createSearchParams, useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();

export default function Inscrire() {

  const navigate = useNavigate();

  const handleGoToRegister = (role) => {
    navigate({
      pathname: "/register",
      search: createSearchParams({
        user: role
      }).toString()
    });
  }






  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <Menu />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'white',
              padding: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'orange' }}>

            </Avatar>
            <Typography component="h1" variant="h5">
              Inscription
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <div className='ueo'>
                <div className='util'>
                  <h5>Utilisateur </h5>
                </div>
                <div className='entre'>
                  <h5> Entreprise </h5>
                </div>
              </div>
              <div className='pho'>
                <div className='put'>  <img src='Images/userrr.png' alt="MMM" height="170px" width="115px" onClick={() => handleGoToRegister('user')} ></img>  </div>
                <div className='pen'> <img src='Images/entreprise.png' alt="MMM" border-radius="90px" height="170px" width="140px" onClick={() => handleGoToRegister('entreprise')} ></img></div>
              </div>
              <Box sx={{ minWidth: 350 }}>

              </Box>















            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}