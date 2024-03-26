import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { ButtonStyled } from '../Form/FormComponentsStyled';
import { useGlobalContext } from '../../context/GlobalContext';
import { searchIcon } from '../../utils/icons';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';


const TransactionFilter = () => {

    const { currency, setFilter, filterClicked, setFilterClicked } = useGlobalContext();


    const [date, setDate] = React.useState([]);

    const defaultAmount = {
        minAmount: '',
        maxAmount: ''
    }

    const [amount, setAmount] = useState({
        ...defaultAmount
    })


    const handleAmountChange = (e) => {
        setAmount((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.replace(/[^0-9.]/g, '')

        }))
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        setFilterClicked(false)
        let payload = {
            minAmount: '',
            maxAmount: '',
            minDate: '',
            maxDate: ''
        };

        if (amount.minAmount !== '') {
            payload = {
                ...payload,
                minAmount: amount.minAmount
            }
        }
        if (amount.maxAmount !== '') {
            payload = {
                ...payload,
                maxAmount: amount.maxAmount
            }
        }

        if (date.length) {
            payload = {
                ...payload,
                minDate: date[0],
                maxDate: date[1]
            }
        }
        setFilter(payload)
        if ((payload.minDate !== '') || (payload.maxDate !== '') || (payload.minAmount !== '') || (payload.maxAmount !== '')) {
            setFilterClicked(true)
        }

        // toast.error('No filters inputted')
    }

    const handleShowAll = () => {
        setFilterClicked(false)
        setDate([])
        setAmount({ ...defaultAmount })
        toast.success('Filter cleared')
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
            <FilterStyled>
                <h4>Filter</h4>
                <DateRangePicker
                    placeholder="Select Date Range"
                    size="sm"
                    value={date}
                    onChange={(dateRange) => setDate(dateRange)}

                />
                <div className="amount-range">
                    <TextField
                        name="minAmount"
                        label="Min"
                        value={amount.minAmount}
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
                    />

                    <TextField
                        name="maxAmount"
                        label="Max"
                        value={amount.maxAmount}
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
                    />
                </div>
                {/* <TextField
                    name="date"
                    value={inputs.date}
                    type={"date"}
                    onChange={handleChange}
                    label="Date"
                    defaultValue={today}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ style: { fontSize: 14 } }}
                    size="small"
                    required
                /> */}

                <ButtonStyled disabled={filterClicked}>{searchIcon} Search</ButtonStyled>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '8rem',
                }}>
                    <ButtonStyled onClick={handleShowAll}>Clear Filter</ButtonStyled>

                </div>
            </FilterStyled>
        </Box>
    )
}

const FilterStyled = styled.div`
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 1rem;
    width: 100%;
    height: auto;
    border-radius: 10px;
    font-size: smaller;
    border: 0.5px solid #3D2B31;

    .amount-range {
        display: flex;
        gap: 1rem;
        
    }

    `

export default TransactionFilter