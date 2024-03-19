import React, { useState } from 'react'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import BarChart from '../Chart/BarChart'
import styled from 'styled-components';


function MonthlyStat() {

    const [statMonth, setStatMonth] = useState('current');

    const monthCategory = [
        {
            value: 'current',
            label: 'Current Month',
        },
        {
            value: 'previous',
            label: 'Previous Month',
        },
        {
            value: 'last3months',
            label: 'Last Three Months',
        },
        {
            value: 'lastyear',
            label: 'Last Year',
        },
    ];

    const handleStatMonthChange = (e) => {
        setStatMonth(e.target.value);
        console.log(statMonth);
    };

    return (
        <MonthlyStatStyled>
            <div className="monthly-stat">
                <h4>Statistics</h4>
                <TextField
                    id="month"
                    value={statMonth}
                    onChange={handleStatMonthChange}
                    select
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ style: { fontSize: 14 } }}
                    size="small"
                    label="Category"
                >
                    {monthCategory.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </MonthlyStatStyled>
    )
}

const MonthlyStatStyled = styled.div`
    height: 100%;

    .monthly-stat {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        flex: 1;
        height: 100%;
        padding: 10px;

        .monthly-stat-items {
            display: flex;
            gap: 1rem;
            width: 100%;
            height: 100%;
            justify-content: space-between;
            font-size: 12px;

            .title {
            display: flex;
            justify-content: center;
            text-decoration: underline;
            padding-block: 5px;
            font-weight: 700;
            }

            .stat {
            justify-content: center;
            display: flex;
            flex-direction: column;
            flex: 1;

            .amount {
                display: flex;
                justify-content: center;
                font-weight: 600;
            }
            }
            
            .expense-display {
                border-left: 1.5px solid #BBB7C4;
                border-right: 1.5px solid #BBB7C4;
                padding-inline: 15px;

                .amount {
                    
                }
            }
        }
    }
`

export default MonthlyStat
