import React, { useState, useEffect } from "react";
import { useGlobalContext } from '../context/GlobalContext';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { homeIcon } from '../utils/icons';
import Box from '@mui/material/Box';
import { ButtonStyled, DivStyled } from '../components/Form/FormComponentsStyled';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import axios from 'axios';
import background from '../img/login-background.jpg'


const Login = () => {

  const { login, setCurrentUserName, setCurrentUserId, setIsAuthenticated } = useGlobalContext()

  // initialize navigation
  const navigate = useNavigate()

  // Check for active user session
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {

        const response = await axios.get('/user');
        if (response.data.error) {
          toast.error('Session ended. Please enter username and password')
        } else {
          // Set authenticatication
          setIsAuthenticated(true)

          // Set User Id
          setCurrentUserId(response.data.id)

          //Set User Name
          setCurrentUserName(response.data.username)

          toast.success('Welcome!')
          navigate('/profile');

        }
      } catch {
        return;
      }
    }
    fetchCurrentUser();
    // eslint-disable-next-line
  }, [])


  // No active session, authenticate user
  const defaultInput = {
    email: "",
    password: "",
  }
  const [inputs, setInputs] = useState(defaultInput)

  const handleChange = (e) => {
    setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }))
  }

  // Handle password visibility
  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  // Handle password visibility toggle
  const handleClickShowPassword = (fieldName) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };


  // Handle submit
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    try {
      const response = await login({ email, password })
      if (response.data.error) {
        toast.error(response.data.error)
      } else {
        // Set authentication to true
        setIsAuthenticated(true);

        // Set User Id
        setCurrentUserId(response.data.id)

        // Empty input fields 
        setInputs(defaultInput)

        // Notify success
        toast.success('Login successful!')

        //Set User Name
        setCurrentUserName(response.data.username)

        // Navigate to user profile and call income and api endpoints
        navigate('/profile');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LoginStyled>
      <div className="login-form-container">
        <Link to="/">{homeIcon}</Link>
        <Box
          component="form"
          onSubmit={loginUser}
          sx={{
            height: '100%',
            '& .MuiTextField-root': { width: '100%' },
          }}
        >
          <DivStyled>
            <div className="sign-in-header"><h3>Sign in</h3></div>
            <TextField
              name='email'
              value={inputs.email}
              type="email"
              label='Email'
              size='small'
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { fontSize: 14 } }}
              variant="outlined"
              required
            />
            <TextField
              required
              name='password'
              value={inputs.password}
              type={showPassword.password ? "text" : "password"}
              label='Password'
              onChange={handleChange}
              variant="outlined"
              size='small'
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword('password')}
                      edge="end"
                    >
                      {showPassword.password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ButtonStyled>Sign in</ButtonStyled>
            <b>Dont have an account?<Link to='/register'> Sign up</Link> </b>
          </DivStyled>
        </Box>
      </div>
    </LoginStyled>
  )
};

const LoginStyled = styled.div`
  color: #000 !important;
  background-color: #EAE1F2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;


  .login-form-container {
    height: auto;
    width: 350px;

    b, .sign-in-header {
        display: flex;
        justify-content: center;
        gap: 0.3rem;
        padding-bottom: 0.7rem;
      }
  }
`


export default Login;