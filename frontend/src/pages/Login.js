import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { homeIcon } from '../utils/icons';


const Login = () => {

  const { login, setCurrentUserName, setCurrentUserId, currentUserId, getIncome, getExpenses, setIsAuthenticated } = useGlobalContext()

  // initialize navigation
  const navigate = useNavigate()

  const defaultInput = {
    email: "",
    password: "",
  }
  const [inputs, setInputs] = useState(defaultInput)

  const handleChange = (e) => {
    setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }))
  }

  //Send user input to endpoint
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

        setInputs(defaultInput)

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
      <Link to="/">{homeIcon}</Link>
      <h1>Sign in</h1>
      <form>
        <input
          required
          name='email'
          value={inputs.email}
          type="text"
          placeholder='email'
          onChange={handleChange} />
        <input
          required
          name='password'
          value={inputs.password}
          type="password"
          placeholder='password'
          onChange={handleChange} />
        <button onClick={loginUser}>Sign in</button>
        <span>Don't have an account? <Link to="/register">Sign up</Link> </span>
      </form>
    </LoginStyled>
  )
}

const LoginStyled = styled.div` 

    h1 {
        font-size: 20px;
        color: teal;
        margin-bottom: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        padding: 30px;
        background-color: grey;
        width: 250px;
        gap: 20px;

        input {
            padding: 10px;
            font-size: 11px;
            border: none;
            border-bottom: 1px solid gray;
        }

        input:focus {
            outline: none;
        }

        button {
            padding: 10px;
            border: none;
            background-color: teal;
            cursor: pointer;
            color: white;
        }

        span {
            font-size: 13px;
            text-align: center;
        }

        p {
            font-size: 12px;
            color: red;
            text-align: center;
        }
    }
`


export default Login