import React, { useState } from 'react'
import { ButtonStyled, DivStyled } from '../Form/FormComponentsStyled';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';


function ResetAccount() {

    const { currentUserId } = useGlobalContext()

    const navigate = useNavigate();

    // Handle Submit Click
    const [buttonClicked, setButtonClicked] = useState(false)

    const [currentStep, setCurrentStep] = useState(1)

    const [password, setPassword] = useState({
        password: ''
    })

    const handleChange = (e) => {
        setPassword((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    // Handle show password
    const [showPassword, setShowPassword] = useState({
        password: false
    });

    // Handle password visibility toggle
    const handleClickShowPassword = (fieldName) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [fieldName]: !prevState[fieldName],
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (currentStep === 1) {
            const checkIsPassword = await axios.put(`/update-password/${currentUserId}`, {
                password: password.password,
                step: currentStep
            })
            if (checkIsPassword.data.error) {
                toast.error(checkIsPassword.data.error)
                return;
            }
            setCurrentStep(checkIsPassword.data.step)
            setPassword({
                password: ''
            })
        }

        // Submit new password
        if (currentStep === 2) {
            toast.loading('Resetting your account...')
            setButtonClicked(true)
            const resetAccount = await axios.delete(`/reset-account/${currentUserId}`)
            if (resetAccount.data.error) {
                toast.dismiss()
                toast.error(resetAccount.data.error)
                setCurrentStep(1);
                return;
            }
            if (resetAccount.data.zeroBalance) {
                toast.dismiss()
                toast.error(resetAccount.data.zeroBalance);
                setCurrentStep(1);
                return;
            }

            toast.success(resetAccount.data.message);
            navigate('/login');

            setTimeout(() => {
                setButtonClicked(false)
            }, 2000);
        }
    }

    return (
        <ResetAccountStyled>
            <h5>Reset Account</h5>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    height: '100%',
                    '& .MuiTextField-root': { width: '100%' },
                }}>
                {currentStep === 1 && (
                    <DivStyled>
                        <TextField
                            name="password"
                            label="Password"
                            value={password.password}
                            onChange={handleChange}
                            type={showPassword.password ? "text" : "password"}
                            variant="outlined"
                            size="small"
                            fullWidth
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
                            required
                        />
                        <ButtonStyled disabled={buttonClicked}>Proceed</ButtonStyled>
                    </DivStyled>
                )}
                {currentStep === 2 && (
                    <DivStyled>
                        <p className='confirm-reset'>Are you sure you want to reset your account?</p>
                        <div className="btn-container">
                            <ButtonStyled style={{
                                backgroundColor: "#ED4545",
                                color: "#FFF",
                            }} onClick={() => setCurrentStep(1)}>Cancel</ButtonStyled>
                            <ButtonStyled disabled={buttonClicked}>Confirm</ButtonStyled>
                        </div>
                    </DivStyled>
                )}
            </Box>
        </ResetAccountStyled>
    )
}

const ResetAccountStyled = styled.div`
    padding: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h5 {
        padding-bottom: 1rem;
    }

    .btn-container {
        display: flex;
        justify-content: left;
        gap: 3rem;
    }

    .confirm-reset {
        font-size: medium;
    }
    
`

export default ResetAccount