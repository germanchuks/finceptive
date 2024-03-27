import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { incomeCategories, expenseCategories } from '../../utils/categoryItems'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { ButtonStyled, DivStyled } from './FormComponentsStyled';
import { useGlobalContext } from '../../context/GlobalContext';
import { plus } from '../../utils/icons';
import { toast } from 'react-hot-toast';


const Form = () => {

    const { currency, addIncome, getIncomes, currentUserId, addExpense, getExpenses, active, getUserBalance, getBudgets, availableBalance } = useGlobalContext()

    const defaultInput = {
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
    }

    // Handle Button Click
    const [buttonClicked, setButtonClicked] = useState(false)

    // Get current date
    const today = (new Date()).toISOString().substring(0, 10)

    const [inputs, setInputs] = useState({
        ...defaultInput
    })


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

    // Get float input amount and user balance
    const amountInput = parseFloat(inputs.amount)
    const balance = parseFloat(availableBalance)

    //Check current active category
    const currentCategory = () => {
        switch (active) {
            case 'Income':
                return {
                    name: 'Income',
                    matchCategory: incomeCategories,
                    submitTo: async () => {
                        const response = await addIncome({ ...inputs, userId: currentUserId })
                        if (response.data.error) {
                            toast.error(response.data.error)
                        } else {
                            toast.success(response.data.message)
                            setInputs({ ...defaultInput });
                            // // Update user balance
                            // const newBalance = balance + amountInput
                            // await updateBalance("income", newBalance);
                            getUserBalance();
                            getIncomes();
                        }
                    }
                }
            case 'Expenses':
                return {
                    name: 'Expense',
                    matchCategory: expenseCategories,
                    submitTo: async () => {
                        if (amountInput > balance) {
                            toast.error('Insufficient balance 🥺😔')
                            return;
                        } else {
                            const response = await addExpense({ ...inputs, userId: currentUserId })
                            if (response.data.error) {
                                toast.error(response.data.error)
                            } else {
                                toast.success(response.data.message)
                                setInputs({ ...defaultInput });
                                // Update user balance
                                // const newBalance = balance - amountInput
                                // await updateBalance("expense", newBalance);
                                getBudgets();
                                getUserBalance();
                                getExpenses();
                            }

                        }
                    }
                }
            default:
                return {
                    name: '',
                    matchCategory: '',
                    submitTo: ''
                }
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        currentCategory().submitTo();
        setButtonClicked(true);
        setTimeout(() => {
            setButtonClicked(false);
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
                    name="amount"
                    label="Amount"
                    value={inputs.amount}
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
                    inputProps={{ max: `${today}` }}
                    size="small"
                    required
                />
                <ButtonStyled disabled={buttonClicked}>{plus} Add {currentCategory().name}</ButtonStyled>
            </DivStyled>
        </Box>
    )
}

export default Form