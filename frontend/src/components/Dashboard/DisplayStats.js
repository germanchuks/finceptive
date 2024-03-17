import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext'
import DoughnutChart from '../Chart/DoughnutChart'
import MonthlyStat from './MonthlyStat'

const DisplayStats = () => {

  const { currency, incomes, expenses, getTotalAmount } = useGlobalContext()

  return (
    <DisplayStatsStyled>
      <div className="figures">

        <div className="available-balance">
          <h5>Available Balance</h5> <div className='amount'> {currency} {'200,000.00'}</div>
        </div>
        <div className="other-stats">
          <div className="income-display stat">
            <span className="title">Income</span>
            <span className="amount">{currency} {getTotalAmount(incomes)}</span>
          </div>
          <div className="expense-display stat">
            <span className="title">Expense</span>
            <span className="amount">{currency} {getTotalAmount(expenses)}</span>
          </div>
          <div className="goal-display stat">
            <span className="title">Goals</span>
            <span className="amount">{currency} {'100000'}</span>
          </div>
        </div>
      </div>
      <div className="chart-container"><DoughnutChart /></div>
      <div className="monthly-stat-container">
        <MonthlyStat />
      </div>
    </DisplayStatsStyled>
  )
}

const DisplayStatsStyled = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  .figures {
    width: 35%;

    .available-balance {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 1px;
      border-bottom: 1.5px solid #BBB7C4;
  
      h5 {
        text-decoration: underline;
        text-align: right;
        padding-bottom: 3px;
        color: #452517;
      }
  
      .amount {
        font-size: 25px;
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
      font-size: 12px;
      margin-top: 5px;
      
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
      
      .income-display {
        
        .amount {
          color: #00B51B;
        }
      }

      .expense-display {
        border-left: 1.5px solid #BBB7C4;
        border-right: 1.5px solid #BBB7C4;
        padding-inline: 15px;
        .amount {
          color: #E02B2B;
        }
      }

      .goal-display {

        .amount {
          color: #1B52E0;
        }
      }
    }
  }
  .chart-container {
    border-right: 1.5px solid #BBB7C4;
    padding-right: 15px;
  }
`;

export default DisplayStats;