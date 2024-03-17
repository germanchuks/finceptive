import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import { homeIcon } from '../utils/icons';


const Register = () => {

  const { register, setCurrentUser } = useGlobalContext()

  const navigate = useNavigate()

  const defaultInput = {
    username: "",
    email: "",
    password: "",
  }
  const [inputs, setInputs] = useState(defaultInput)

  const notify = (msg) => toast(msg);

  const handleChange = (e) => {
    setInputs(prev => ({ ...inputs, [e.target.name]: e.target.value }))
  }


  //Send user input to endpoint
  const registerUser = async (e) => {
    e.preventDefault();
    const { username, email, password } = inputs;
    try {
      const response = await register({ username, email, password })
      if (response.data.error) {
        toast.error(response.data.error)
      } else {
        setInputs(defaultInput)
        toast.success('Account created. Proceed to login')
        navigate('/login')
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RegistrationStyled>
      <Link to="/">{homeIcon}</Link>
      <h1>Sign up</h1>
      <form>
        <input
          required
          name='username'
          value={inputs.username}
          type="text"
          placeholder='username'
          onChange={handleChange} />
        <input
          required
          name='email'
          value={inputs.email}
          type="email"
          placeholder='email'
          onChange={handleChange} />
        <input
          required
          name='password'
          value={inputs.password}
          type="password"
          placeholder='password'
          onChange={handleChange} />
        <button onClick={registerUser}>Sign up</button>
        <span>Already have an account? <Link to='/login'>Sign in</Link> </span>
      </form>
    </RegistrationStyled>
  )
};

const RegistrationStyled = styled.div` 

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


export default Register