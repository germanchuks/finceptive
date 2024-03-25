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


function ChangePassword() {

    const { currentUserId, logout } = useGlobalContext();
    const navigate = useNavigate()

    const defaultInput = {
        oldpassword: '',
        newpassword: '',
        confirm: ''
    }

    const [currentStep, setCurrentStep] = useState(1)
    const [password, setPassword] = useState({ ...defaultInput })

    // Handle Submit Click
    const [buttonClicked, setButtonClicked] = useState(false)

    // Handle show password
    const [showPassword, setShowPassword] = useState({
        oldpassword: false,
        newpassword: false,
        confirm: false
    });

    const handleChange = (e) => {
        setPassword((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    // Handle password visibility toggle
    const handleClickShowPassword = (fieldName) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [fieldName]: !prevState[fieldName],
        }));
    };

    // Submit new user password
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Confirm current password
        if (currentStep === 1) {
            const checkIsPassword = await axios.put(`/update-password/${currentUserId}`, {
                password: password.oldpassword,
                step: currentStep
            })
            if (checkIsPassword.data.error) {
                toast.error(checkIsPassword.data.error)
                return;
            }
            setCurrentStep(checkIsPassword.data.step)
            toast.success('Proceed')
        }

        // Submit new password
        if (currentStep === 2) {
            if (password.newpassword !== password.confirm) {
                toast.error("Passwords do not match!")
                return;
            } else {
                const submitNew = await axios.put(`/update-password/${currentUserId}`, {
                    newpassword: password.newpassword,
                    step: 2
                })
                if (submitNew.data.error) {
                    toast.error(submitNew.data.error)
                    return;
                }
                toast.success(submitNew.data.message)
                setPassword({ ...defaultInput })

                // Navigate back to login page
                setTimeout(() => {
                    toast.success('Please log in with your updated password.')
                    logout();
                    navigate('/');
                }, 2000);
            }
        }


        setTimeout(() => {
            setButtonClicked(false);
        }, 2500);
    }


    return (
        <ChangePasswordStyled>
            <h5>Change Password</h5>
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
                            name="oldpassword"
                            label="Current Password"
                            value={password.oldpassword}
                            onChange={handleChange}
                            type={showPassword.oldpassword ? "text" : "password"}
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickShowPassword('oldpassword')}
                                            edge="end"
                                        >
                                            {showPassword.oldpassword ? <VisibilityOff /> : <Visibility />}
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
                        <TextField
                            name="newpassword"
                            label="New Password"
                            value={password.newpassword}
                            onChange={handleChange}
                            type={showPassword.newpassword ? "text" : "password"}
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickShowPassword('newpassword')}
                                            edge="end"
                                        >
                                            {showPassword.newpassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            required
                        />
                        <TextField
                            name="confirm"
                            label="Confirm New Password"
                            value={password.confirm}
                            onChange={handleChange}
                            type={showPassword.confirm ? "text" : "password"}
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => handleClickShowPassword('confirm')}
                                            edge="end"
                                        >
                                            {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            required
                        />
                        <ButtonStyled disabled={buttonClicked}>Submit</ButtonStyled>
                    </DivStyled>
                )}
            </Box>
        </ChangePasswordStyled>
    )
}

const ChangePasswordStyled = styled.div`
    padding: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h5 {
        padding-bottom: 1rem;
    }
`

export default ChangePassword