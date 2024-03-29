import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/GlobalContext'
import Form from '../Form/Form'
import ExpenseItem from './ExpenseItem'
import { dropIcon, hideIcon } from '../../utils/icons';
import { useMediaQuery } from "react-responsive";


function Expense() {
  const { currency, expenses, getTotalAmount } = useGlobalContext()

  // Toggle form on small screen size
  const isMobile = useMediaQuery({ maxWidth: 750 });

  const [expenseForm, setExpenseForm] = useState(false)

  useEffect(() => {
    if (!isMobile) {
      setExpenseForm(true)
    }
  }, [isMobile])


  return (
    <ExpenseStyled>
      <InnerLayout>
        <div className={(expenseForm || !isMobile) ? "form" : "form-close"}>
          <div className="total-expense"><h6>Total Expense:</h6> {currency} {getTotalAmount(expenses)}</div>
          <Form />
        </div>
        <div className="expenses">
          <div className="expenses-header">
            <h4>All Expense</h4>
            {
              isMobile &&
              <div className="toggle-form" onClick={() => setExpenseForm(!expenseForm)}>
                {expenseForm ? hideIcon : dropIcon} <small>{expenseForm ? 'Hide form' : 'Show form'}</small>
              </div>
            }
          </div>
          {
            (!expenses.length &&
              <div className="empty-expense">
                Add an expense
              </div>)
            ||
            expenses.map((expense) => {
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
                dashboard={false}
              />
            })}
        </div>
      </InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`

  .form {
    width: 40%;
    
    .total-expense {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-bottom: 0.8rem;
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .empty-expense {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
      width: 100%;
      flex: 1;
      font-size: medium;
      padding-top: 30%;
    }

  }

  /* Small Screen */
  @media (max-width: 750px) {
    position: relative;
  
    .form {
      
      opacity: 1;
      height: auto;
      width: 100%;
      padding-inline: .5rem;

    }

    .form-close {
      transition: all 3s linear;
      opacity: 0;
      height: 0;
      overflow: hidden;
    }

    .toggle-form {
      display: flex;
      align-items: center;
    }
    
    .expenses { 
      width: 100%;

      .expenses-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      .empty-expense {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.5;
        width: 100%;
        flex: 1;
        font-size: medium;
        padding-top: 30%;
      }

    }
  }  

`

export default Expense