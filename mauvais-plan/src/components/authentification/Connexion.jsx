import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signin } from '../services/AuthService';
import Swal from 'sweetalert2';
import WithReactContent from 'sweetalert2-react-content';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Menu from '../../menu/Menu'
import { toast } from 'react-toastify';

const MySwal = WithReactContent(Swal);

export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      const res = await signin(user);
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        return thunkAPI.rejectWithValue('Email does not exist');
      }
      return thunkAPI.rejectWithValue();
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    isLoggedIn: false,
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        localStorage.setItem('CC_Token', action.payload.token);
        localStorage.setItem('refresh_token', action.payload.refreshToken);
        MySwal.fire({
          icon: 'success',
        });
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

const theme = createTheme();

export default function Login() {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailExistError, setIsEmailExistError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      setIsEmailExistError(false);
      return;
    }

    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user))
      .unwrap()
      .catch((error) => {
        if (error === 'Email does not exist') {
          
          toast.error('Veuillez vérifier votre email et mot de passe');
        
      } else if (error.message === 'Incorrect password') {
        toast.error('password does not exist.');
      }
    });
};

  useEffect(() => {
    if (isLoggedIn) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'super administrateur') {
        navigate('/DashboardSuper');
      } else {
        navigate('/AccueilUser');
      }
    } 
  }, [isLoggedIn]);

  return (
    <>
    <Menu/>
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
            padding: 4,
            borderRadius: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                autoFocus
                error={!isEmailValid}
                helperText={!isEmailValid && "L'adresse Email est non valide"}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setIsEmailValid(true);
                }}
              />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {isEmailExistError && <Alert severity="error">Email does not exist.</Alert>}
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Se souvenir de moi" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Se connecter
            </Button>
           
            <Grid container>
            <Link to='/register' variant="body2"  >
                  Vous n'avez pas de compte?
                </Link>
              <Grid item>
               
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}
