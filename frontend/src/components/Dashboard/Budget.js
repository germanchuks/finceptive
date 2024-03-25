import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import ProgressBar from '@ramonak/react-progress-bar';
import styled from 'styled-components';
import { expenseCategories } from '../../utils/categoryItems';
import { useGlobalContext } from '../../context/GlobalContext';


function Budget() {

    const { budgets, currency } = useGlobalContext();

    const defaults = {
        maxAmount: "",
        currentAmount: ""
    }


    const [budgetCategory, setBudgetCategory] = useState('');
    const [selectedBudget, setSelectedBudget] = useState(defaults);

    // Set default view on first load
    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 12);

        setBudgetCategory(expenseCategories[randomNumber].value)

        setSelectedBudget({
            maxAmount: expenseCategories[randomNumber].maxAmount,
            currentAmount: expenseCategories[randomNumber].currentAmount
        })
    }, [])


    const handleChange = (e) => {
        setBudgetCategory(e.target.value)
    };

    useEffect(() => {
        const budget = budgets.find(
            (item) => item.category === budgetCategory
        );

        if (budget) {
            setSelectedBudget({
                maxAmount: budget.maxAmount,
                currentAmount: budget.currentAmount
            })
        } else {
            setSelectedBudget(defaults)
        }
        // eslint-disable-next-line
    }, [budgetCategory])


    return (
        <BudgetStyled>
            <h5>Budget</h5>
            <div className="category">
                <TextField
                    id="month"
                    value={budgetCategory}
                    onChange={handleChange}
                    select
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { fontSize: 14 } }}
                    size="small"
                    label="Category"
                >
                    {expenseCategories.slice(0, -2).map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className='content'>
                {
                    (selectedBudget.maxAmount !== "" &&
                        <div className="budget-bar">
                            <ProgressBar
                                completed={((selectedBudget.currentAmount / selectedBudget.maxAmount) * 100).toFixed(0)}
                                maxCompleted={100}
                                bgColor='#3B66FF'
                                height='20px'
                                labelColor='#080E24'
                                baseBgColor='#DEE5FF'
                                borderRadius='15px'
                                animateOnRender={true}
                            />
                            <div className='amount'> {currency} {selectedBudget.currentAmount} of {currency} {selectedBudget.maxAmount} </div>
                        </div>
                    )
                    ||
                    <div className="no-budget">
                        <p>No budget set</p>
                    </div>
                }
            </div>
        </BudgetStyled>
    )
}

const BudgetStyled = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    h5 {
        display: flex;
        flex: 0.5;
    }
    .category {
        display: flex;
        flex-direction: column;
        flex: 0.5;
    }

    .content {
        display: flex;
        flex-direction: column;
        flex: 2;
        
        .budget-bar {

            .amount {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0.5rem;
                font-size: smaller;
            }
        }
        
        .no-budget {
            flex: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: smaller;
            opacity: 0.7;
        }
    }
    `

export default Budget
