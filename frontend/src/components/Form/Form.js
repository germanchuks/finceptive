import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { incomeCategories, expenseCategories } from '../../utils/categoryItems'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { ButtonStyled, DivStyled } from './FormComponentsStyled';
import { useGlobalContext } from '../../context/GlobalContext';
import { plus } from '../../utils/icons';


const Form = () => {

    const { currency, addIncome, currentUserId, addExpense, active } = useGlobalContext()

    const defaultInput = {
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
    }

    const [inputs, setInputs] = useState({
        ...defaultInput
    })


    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };


    //Check current active category

    const currentCategory = () => {
        switch (active) {
            case 'Income':
                return {
                    name: 'Income',
                    matchCategory: incomeCategories,
                    submitTo: () => addIncome({ ...inputs, userId: currentUserId })
                }
            case 'Expenses':
                return {
                    name: 'Expense',
                    matchCategory: expenseCategories,
                    submitTo: () => addExpense({ ...inputs, userId: currentUserId })
                }
            default:
                return {
                    name: '',
                    matchCategory: '',
                    submitTo: ''
                }
        }
    }
    // const currentCategory = {
    //     name: active === 'Income' ? 'Income' : (active === 'Expenses' ? 'Expense' : ''),
    //     matchCategory: active === 'Income' ? incomeCategories : (active === 'Expenses' ? expenseCategories : ''),
    //     submitTo: active === 'Income' ? () => addIncome(inputs) : (active === 'Expenses' ? () => addExpense(inputs) : null),
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        currentCategory().submitTo();
        setInputs({ ...defaultInput });
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
                    name="amount"
                    label="Amount"
                    value={inputs.amount}
                    onChange={handleChange}
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
                    {currentCategory().matchCategory.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
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
                <TextField
                    name="date"
                    value={inputs.date}
                    type={"date"}
                    onChange={handleChange}
                    label="Date"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ style: { fontSize: 14 } }}
                    size="small"
                    required
                />
                <ButtonStyled>{plus} Add {currentCategory().name}</ButtonStyled>
            </DivStyled>
        </Box>
    )
}

export default Form;