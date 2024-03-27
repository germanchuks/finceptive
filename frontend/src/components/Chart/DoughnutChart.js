import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/GlobalContext';
import { Chart as ChartJS, ArcElement, Title } from "chart.js";
import styled from 'styled-components';


ChartJS.register(ArcElement, Title);

const DoughnutChart = () => {

	const { getTotalAmount, incomes, expenses, goals } = useGlobalContext()

	const totalIncome = getTotalAmount(incomes);
	const totalExpense = getTotalAmount(expenses);
	const totalSavedGoal = getTotalAmount(goals);

	const data = {
		labels: ['Income', 'Expense', 'Goal'],
		datasets: [
			{
				data: [totalIncome, totalExpense, totalSavedGoal],
				backgroundColor: ['#2ECC71', '#E74C3C', '#3BA0FF'],
				hoverBackgroundColor: ['#27AE60', '#C0392B', '#2F80CC'],
				cutout: '70%'
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false
			}
		}
	}

	return (
		<ChartStyled>
			<Doughnut
				data={data}
				options={options}

			/>
		</ChartStyled>
	)
}

const ChartStyled = styled.div`
	@media (min-width: 750px) {
		height: 150px;
		width: 150px;
	}
	@media (max-width: 750px) {
		width: 145px;
		height: 145px;

	}
`;

export default DoughnutChart