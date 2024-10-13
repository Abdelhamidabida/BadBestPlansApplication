import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { urlimage } from '../../axios/Api';
import Col from 'react-bootstrap/Col';
import Checkbox from '@mui/material/Checkbox';
import Form from 'react-bootstrap/Form';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from '../../menu/Menu';
import { fetchVilles } from "../services/VilleService";


import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { AddUser } from '../services/UserService';
import { ENTREPRISE, USER, ADMIN } from '../../util/Roles';
import { fetchCategories } from '../services/CategoriesService';
import { useDispatch } from 'react-redux';
import { buildFormData } from "../../util/ConvertFormData";
import { register } from '../../features/AuthSlice';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';


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

export default function InscrireUser() {

  const [searchParams, setSearchParams] = useSearchParams()
  const role = searchParams.get('role') || USER
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState('');
  const handlePasswordChange = (event) => {
  const newPassword = event.target.value;
  setPassword(newPassword);

  // Use a regular expression to check for at least 8 characters, at least one digit, and at least one special character
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    setPasswordError('Le mot de passe doit contenir au moins 8 caractères, au moins un chiffre et au moins un caractère spécial');
  } else {
    setPasswordError('');
  }
};

  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [nomen, setNomen] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [villes, setVilles] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };
  // ID
  const [categorie, setCategorie] = useState([]);
  //categorie
  const [categories, setCategories] = useState("");

  const [contenuv, setContenuv] = useState("");
  const [isNomValid, setIsNomValid] = useState(true);
  const [isPrenomValid, setIsPrenomValid] = useState(true);


  const navigate = useNavigate()


  useEffect(() => {
    GetListvilles();
  }, []);
  const GetListvilles = async () => {
    fetchVilles().then(res => {
      setVilles(res.data)
    })
      .catch(error => { console.log(error) })
  }
  useEffect(() => {
    getfetchCategories();
  }, []);
  const getfetchCategories = async () => {
    fetchCategories().then(res => {
      setCategorie(res.data)
    })
      .catch(error => { console.log(error) })
  }
  const [isNomenValid, setIsNomenValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === USER && nom.trim() === '') {
      setIsNomValid(false);
      return;
    }
    if (role === ENTREPRISE && nomen.trim() === '') {
      setIsNomenValid(false);
      return;
    }
    if (role === USER && prenom.trim() === '') {
      setIsPrenomValid(false);
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      return;
    }
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères et au moins un chiffre');
      return;
    }
  
    
  
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('ville', contenuv);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', 'user');
    formData.append('nom', nom);
    formData.append('prenom', prenom);
    // Add other attributes if necessary
  
    AddUser(formData)
      .then(() => {
        // Redirection to the desired page after successful registration
        navigate('/');
  
        // Display a success message
        toast.success('Merci de vous inscrire dans notre application. ', {
          position: toast.POSITION.LEFT,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        // Handle registration errors
        // ...
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
              borderRadius: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'orange' }}>

            </Avatar>
            <Typography component="h1" variant="h5">
              Inscription
            </Typography>
            <Box component="form" onSubmit={handleSubmit} enctype="multipart/form-data" noValidate sx={{ mt: 3 }}>
              {
                role === ENTREPRISE && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Nom"
                      value={nomen}
                      onChange={(event) => {
                        setNomen(event.target.value);
                        setIsNomenValid(true);
                      }}
                      autoFocus
                      error={!isNomenValid}
                      helperText={!isNomenValid && "Le champ nomen est requis"}

                    />

                  </Grid>)}

              <Grid container spacing={2}>
                {
                  role === USER && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Nom"
                        value={nom}
                        onChange={(event) => {
                          setNom(event.target.value);
                          setIsNomValid(true);
                        }}
                        autoFocus
                        error={!isNomValid}
                        helperText={!isNomValid && "Le champ nom est requis"}

                      />
                    </Grid>)}
                {
                  role === USER && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Prénom"
                        name="lastName"
                        autoComplete="family-name"
                        value={prenom}
                        onChange={(event) => {
                          setPrenom(event.target.value);
                          setIsPrenomValid(true);
                        }}
                        error={!isPrenomValid}
                        helperText={!isPrenomValid && "Le champ prénom est requis"}
                      />

                    </Grid>)}
                <Box sx={{ minWidth: 350 }}>
                  <Form.Group as={Col} md="12" className='villu'>

                    <Form.Control
                      as="select"
                      label="Ville"
                      type="select"

                      value={contenuv}
                      onChange={(event) => setContenuv(event.target.value)}
                    >
                      <option >Sélectionner votre ville</option>
                      {villes ? villes.map((ville) => <option key={ville._id}
                        value={ville._id}>{ville.nomVille}</option>) : null}
                    </Form.Control>
                  </Form.Group>



                </Box>
                {
                  role === ENTREPRISE && (
                    <Box sx={{ minWidth: 350 }}>

                      <Form.Group as={Col} md="12" className='cat1'>

                        <Form.Control
                          as="select"
                          label="Ville"
                          type="select"

                          value={categories}
                          onChange={(event) => setCategories(event.target.value)}
                        >
                          <option >Sélectionner votre catégorie</option>
                          {categorie ? categorie.map((cat) => <option key={cat._id}
                            value={cat._id}>{cat.nomcategorie}</option>) : null}
                        </Form.Control>
                      </Form.Group>
                    </Box>)}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    type='Email'
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!isEmailValid}
                    helperText={!isEmailValid && "Email address is not valid"}
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setIsEmailValid(true);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={passwordError !== ''}
                    helperText={passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />


                </Grid>

                <Form.Group>
                  <Form.Label style={{ marginLeft: '23px', marginTop: '10px' }}>Photo du profil : </Form.Label>
                  <Form.Control
                    style={{ marginLeft: '20px', marginRight: '8px' }}
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                  />
                </Form.Group>


              </Grid>
              <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                CONNECTER
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to='/connexion' variant="body2">
                    Vous avez un compte ? Connecter
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}