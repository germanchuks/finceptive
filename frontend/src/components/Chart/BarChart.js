import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/GlobalContext';
import { Chart as ChartJS, ArcElement, Title } from "chart.js";
import styled from 'styled-components';


ChartJS.register(ArcElement, Title );

const BarChart = () => {
		
	const totalMonthIncome = 700;
	const totalMonthExpense = 500;
	const totalMonthSaved = 300;
	


	const labels = ['Income', 'Expense', 'Goal']
    const data = {
    labels: labels,
    datasets: [
        {
            data: [totalMonthIncome, totalMonthExpense, totalMonthSaved],
            backgroundColor: ['#2ECC71', '#E74C3C', '#3BA0FF'],
        }
        ]
    };


	return (
		<ChartStyled>
			<Bar
				data={data}

			/>
		</ChartStyled>
	)
}

const ChartStyled = styled.div`

`;

export default BarChart