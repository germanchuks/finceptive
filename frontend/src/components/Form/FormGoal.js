import React, { useState } from 'react'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { ButtonStyled, DivStyled } from './FormComponentsStyled';
import { useGlobalContext } from '../../context/GlobalContext';
import { plus } from '../../utils/icons';
import { goalCategories } from '../../utils/categoryItems';
import { toast } from 'react-hot-toast';


const FormGoal = () => {

    const { currency, currentUserId, active, addGoal, getGoals } = useGlobalContext()

    const defaultInput = {
        title: "",
        targetAmount: "",
        targetDate: "",
        description: "",
        category: ""
    }

    const [inputs, setInputs] = useState({
        ...defaultInput
    })

    // Deactivate button on create
    const [btnClicked, setBtnClicked] = useState(false)

    // Get current date
    const today = (new Date()).toISOString().substring(0, 10)

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleAmountChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.replace(/[^0-9.]/g, '')

        }))
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Deactivate button
        setBtnClicked(true);
        const response = await addGoal({ ...inputs, userId: currentUserId })
        if (response.data.error) {
            toast.error(response.data.error)
        } else {
            toast.success(response.data.message)
            setInputs({ ...defaultInput });
            getGoals();
        }
        // Activate button
        setTimeout(() => {
            setBtnClicked(false);
        }, 2500);

    }


    return (
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
                    name="title"
                    label="Title"
                    value={inputs.title}
                    onChange={handleChange}
                    type={"text"}
                    variant="outlined"
                    size="small"
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ style: { fontSize: 14 } }}
                    required

                />
                <TextField
                    name="targetAmount"
                    label="Target Amount"
                    value={inputs.targetAmount}
                    onChange={handleAmountChange}
                    type={"text"}
                    size="small"

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
                <TextField
                    name="category"
                    id="category"
                    value={inputs.category}
                    onChange={handleChange}
                    select
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { fontSize: 14 } }}
                    size="small"
                    label="Category"
                    required
                >
                    {goalCategories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    name="targetDate"
                    value={inputs.targetDate}
                    type={"date"}
                    onChange={handleChange}
                    label="Target Date"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: `${today}` }}
                    size="small"
                    required
                />
                <TextField
                    name="description"
                    id="description"
                    value={inputs.description}
                    onChange={handleChange}
                    label="Description"
                    multiline
                    rows={2}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { fontSize: 14, fontStyle: 'italic' } }}
                />
                <ButtonStyled disabled={btnClicked}>{plus} Create New Goal</ButtonStyled>
            </DivStyled>
        </Box>
    )
}

export default FormGoal