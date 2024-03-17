import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/GlobalContext'
import Form from '../Form/Form'
import IncomeItem from './IncomeItem'
import { AddSuccess } from '../Notification/Notification'

function Income() {
  const { currency, showSuccess, incomes, getIncomes, getTotalAmount } = useGlobalContext()

  return (
    <IncomeStyled>
      <InnerLayout>
        <div className="income-container">
          <div className="form">
            <div className="total-income"><h6>Total Income:</h6> {currency} {getTotalAmount(incomes)}</div>
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              const { _id, title, amount, description, category, date } = income;
              return <IncomeItem
                id={_id}
                title={title}
                amount={amount}
                description={description}
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
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
  overflow: auto;
  display: flex;

  .income-container {
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
    
    .total-income {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-block: 15px;
      border-radius: 10px;
      background-color: #4caf50;
      font-size: larger;
      color: #FFF;
      font-weight: bold;
      text-shadow: -2px -2px 6px rgba(0,0,0,0.66);
      box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
      
    }
  }

  .incomes { 
    flex: 1;
    overflow-y: scroll;
    height: 83vh;
    padding-inline: 1rem;
  }

  .incomes::-webkit-scrollbar {
    display: none;
  }
`

export default Income;