import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext'
import DoughnutChart from '../Chart/DoughnutChart'
import Budget from './Budget'

const DisplayStats = () => {

  const { currency, incomes, expenses, goals, availableBalance, getTotalAmount } = useGlobalContext()

  const totalIncomes = getTotalAmount(incomes);
  const totalExpenses = getTotalAmount(expenses);
  const totalGoals = getTotalAmount(goals);


  return (
    <DisplayStatsStyled>
      <div className="figures">
        <div className="available-balance">
          <h5>Available Balance</h5> <div className='amount'> {currency} {availableBalance}</div>
        </div>
        <div className="other-stats">
          <div className="income-display stat">
            <span className="title">Income</span>
            <span className="amount">{currency} {totalIncomes}</span>
          </div>
          <div className="expense-display stat">
            <span className="title">Expense</span>
            <span className="amount">{currency} {totalExpenses}</span>
          </div>
          <div className="goal-display stat">
            <span className="title">Goals</span>
            <span className="amount">{currency} {totalGoals}</span>
          </div>
        </div>
      </div>

      <div className="chart-container"><DoughnutChart /></div>

      <div className="budget-container">
        <Budget />
      </div>
    </DisplayStatsStyled>
  )
}

const DisplayStatsStyled = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  .figures {
    width: 40%;

    .available-balance {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 0.5rem;
      border-bottom: 1.5px solid #BBB7C4;
  
      h5 {
        text-decoration: underline;
        text-align: right;
        padding-bottom: 3px;
        color: #452517;
      }
  
      .amount {
        font-size: 28px;
        font-family: cursive;
        font-weight: 800;
        padding-block: 7px;
        display: flex;
        justify-content: right;
      }
    }
  
    .other-stats {
      display: flex;
      gap: 1rem;
      width: 100%;
      align-items: center;
      justify-content: center;
      font-size: medium;
  

      
      .title {
        display: flex;
        justify-content: center;
        font-weight: 700;
        font-size: x-small;
        flex: 1;
        padding-top: 0.1rem;
      }

      .stat {
        justify-content: center;
        display: flex;
        flex-direction: column;
        flex: 1;
        border: 0.5px solid #000;

        .amount {
          display: flex;
          justify-content: center;
          font-weight: 600;
          padding-block: 0.2rem;
          flex: 3;
        }
      }
      
      .income-display {
        background-color: #FFF;
        .amount {
          color: #00B51B;
        }
      }

      .expense-display {
        background-color: #FFF;

        .amount {
          color: #E02B2B;
        }
      }

      .goal-display {
        background-color: #FFF;

        .amount {
          color: #1B52E0;
        }
      }
    }
  }

  .chart-container {
    border-right: 1.5px solid #BBB7C4;
    padding-right: 15px;
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .budget-container {
    width: 35%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export default DisplayStats;