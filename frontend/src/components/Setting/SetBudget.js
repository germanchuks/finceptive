import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { ButtonStyled, DivStyled } from '../Form/FormComponentsStyled';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { useGlobalContext } from '../../context/GlobalContext';
import { toast } from 'react-hot-toast';
import { expenseCategories } from '../../utils/categoryItems';
import { returnIcon } from '../../utils/icons';


function SetBudget() {

    const { currentUserId, currency, getBudgets } = useGlobalContext()

    const [option, setOption] = useState('');

    const handleRadioChange = (e) => {
        setOption(e.target.value);
    };

    const defaultInput = {
        categoryCreate: "",
        maxAmount: "",
        categoryDelete: "",
    }

    // Handle Button Click
    const [buttonClicked, setButtonClicked] = useState(false)

    const [inputs, setInputs] = useState({
        ...defaultInput
    })


    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    //
    const handleAmountChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.replace(/[^0-9.]/g, '')

        }))
    };


    // Submit function to change user display name
    const handleSubmit = async (e) => {
        e.preventDefault();

        let response;

        if (option === 'create') {
            toast.loading('Creating budget...')
            response = await axios.post(`/create-budget/${currentUserId}`, inputs)
        } else if (option === 'delete') {
            toast.loading('Deleting budget')
            response = await axios.delete(`/delete-budget/${currentUserId}/${inputs.categoryDelete}`)
        }
        if (response.data.error) {
            toast.dismiss()
            toast.error(response.data.error)
            return;
        }

        setButtonClicked(true);

        toast.dismiss()
        toast.success(response.data.message)

        getBudgets();

        setInputs(defaultInput)

        setTimeout(() => {
            setButtonClicked(false);
        }, 2000);
    }



    return (
        <SetBudgetStyled>
            {
                (option === "" &&
                    <div className="select-option">
                        <h4>Budgets</h4>
                        <FormLabel id="demo-controlled-radio-buttons-group">Select an option</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={option}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="create" control={<Radio />} label="Create a new budget" />
                            <FormControlLabel value="delete" control={<Radio />} label="Delete an existing budget" />
                        </RadioGroup>
                    </div>)
                ||
                (option === "create" &&
                    <div className="create-budget">
                        <div onClick={() => setOption("")} style={{ cursor: 'pointer' }}>{returnIcon}</div>
                        <h5>Create Budget</h5>
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
                                    name="categoryCreate"
                                    id="categoryCreate"
                                    value={inputs.categoryCreate}
                                    onChange={handleChange}
                                    select
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ style: { fontSize: 14 } }}
                                    label="Choose a category"
                                    required
                                >
                                    {expenseCategories.slice(0, -2).map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    name="maxAmount"
                                    label="Budget"
                                    value={inputs.maxAmount}
                                    onChange={handleAmountChange}
                                    type={"text"}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {currency}
                                            </InputAdornment>
                                        ),
                                        style: { fontSize: 14 }
                                    }}
                                    required
                                />

                                <ButtonStyled disabled={buttonClicked}>Create</ButtonStyled>
                            </DivStyled>
                        </Box>
                    </div>
                )
                ||
                (option === "delete" &&
                    <div className="delete-budget">
                        <div onClick={() => setOption("")} style={{ cursor: 'pointer' }}>{returnIcon}</div>
                        <h5>Delete Budget</h5>
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
                                    name="categoryDelete"
                                    id="categoryDelete"
                                    value={inputs.categoryDelete}
                                    onChange={handleChange}
                                    select
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ style: { fontSize: 14 } }}
                                    label="Choose a category"
                                    required
                                >
                                    {expenseCategories.slice(0, -2).map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <ButtonStyled disabled={buttonClicked}>Delete</ButtonStyled>
                            </DivStyled>
                        </Box>
                    </div>
                )
            }
        </SetBudgetStyled >
    )
}

const SetBudgetStyled = styled.div`
    padding: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .select-option {
        display: flex;
        flex-direction: column;
        gap: 1rem;

    }

    h5 {
        padding-bottom: 1rem;
    }
`

export default SetBudget