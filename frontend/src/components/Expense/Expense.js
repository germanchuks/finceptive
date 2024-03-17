import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/GlobalContext'
import Form from '../Form/Form'
import ExpenseItem from './ExpenseItem'
import { AddSuccess } from '../Notification/Notification'

function Expense() {
  const { currency, showSuccess, expenses, getExpenses, getTotalAmount } = useGlobalContext()

  return (
    <ExpenseStyled>
      <InnerLayout>
        <div className="expense-container">
          <div className="form">
            <div className="total-expense"><h6>Total Expense:</h6> {currency} {getTotalAmount(expenses)}</div>
            <Form />
          </div>
          <div className="expenses">
            {expenses.map((expense) => {
              const { _id, title, amount, description, type, category, date } = expense;
              return <ExpenseItem
                id={_id}
                title={title}
                amount={amount}
                description={description}
                type={type}
                category={category}
                date={date}
                key={_id}
              />
            })}
          </div>
          {showSuccess.show && (
            <AddSuccess message={showSuccess.message} />
          )}
        </div>
      </InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`
  overflow: auto;
  display: flex;

  .expense-container {
    display: flex;
    gap: 2.5rem;
    position: relative;

  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: rem;
    height: 80%;
    width: 35%;
    
    .total-expense {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-block: 15px;
      border-radius: 10px;
      background-color: #E03D45;
      font-size: larger;
      color: #FFF;
      font-weight: bold;
      text-shadow: -2px -2px 6px rgba(0,0,0,0.66);
      box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
      
    }
  }

  .expenses { 
    flex: 1;
    overflow-y: scroll;
    height: 83vh;
    padding-inline: 1rem;
  }

  .expenses::-webkit-scrollbar {
    display: none;
  }
`

export default Expense;