import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { ButtonStyled, DivStyled } from '../Form/FormComponentsStyled';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';
import { toast } from 'react-hot-toast';


function SetDisplayName() {

    const { setCurrentUserName, currentUserName, currentUserId } = useGlobalContext()

    const [newName, setNewName] = useState({
        newname: ''
    })

    // Handle Button Click
    const [buttonClicked, setButtonClicked] = useState(false)

    // Handle textfield input state change
    const handleChange = (e) => {
        setNewName((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    // Submit function to change user display name
    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonClicked(true);

        if (currentUserName === newName.newname) {
            toast.error('New username must be different from current!')
            return;
        }


        // Set new name end point call;
        const response = await axios.put(`/update-username/${currentUserId}`, newName);

        if (response.data.error) {
            toast.error('Error occured. Try again later!')
            return;
        }

        //Set User Name state
        setCurrentUserName(response.data.username)
        toast.success('New display name set!')

        setNewName({
            newname: ''
        })

    }

    setTimeout(() => {
        setButtonClicked(false);
    }, 3000);

    return (
        <SetDisplayNameStyled>
            <h5>New Display Name</h5>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    height: '100%',
                    '& .MuiTextField-root': { width: '100%' },
                }}
            >
                <DivStyled>

                    <TextField
                        name="newname"
                        label="Username"
                        value={newName.newname}
                        onChange={handleChange}
                        type={"text"}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ style: { fontSize: 14 } }}
                        required
                    />

                    <ButtonStyled disabled={buttonClicked}>Confirm</ButtonStyled>
                </DivStyled>
            </Box>
        </SetDisplayNameStyled>
    )
}

const SetDisplayNameStyled = styled.div`
    padding: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h5 {
        padding-bottom: 1rem;
    }
`

export default SetDisplayName