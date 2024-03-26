import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/GlobalContext'
import Form from '../Form/Form'
import IncomeItem from './IncomeItem'
import { dropIcon, hideIcon } from '../../utils/icons';
import { useMediaQuery } from "react-responsive";

function Income() {
  const { currency, incomes, getTotalAmount } = useGlobalContext()

  // Toggle form on small screen size
  const isMobile = useMediaQuery({ maxWidth: 750 });

  const [formOpen, setFormOpen] = useState(true)

  useEffect(() => {
    if (!isMobile) {
      setFormOpen(true)
    }
  }, [isMobile])


  return (
    <IncomeStyled>
      <InnerLayout>
        <div className={formOpen ? "form" : "form-close"}>
          <div className="total-income"><h6>Total Income:</h6> {currency} {getTotalAmount(incomes)}</div>
          <Form />
        </div>
        <div className="incomes">
          <div className="incomes-header">
            <h4>All Income</h4>
            {
              isMobile &&
              <div className="toggle-form" onClick={() => setFormOpen(!formOpen)}>
                {formOpen ? hideIcon : dropIcon} <small>{formOpen ? 'Hide form' : 'Show form'}</small>
              </div>
            }
          </div>
          {
            (!incomes.length &&
              <div className="empty-income">
                Add an income
              </div>)
            ||
            incomes.map((income) => {
              const { _id, title, amount, description, category, date } = income;
              return <IncomeItem
                id={_id}
                title={title}
                amount={amount}
                description={description}
                category={category}
                date={date}
                key={_id}
                dashboard={false}
              />
            })}
        </div>
      </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
  
  .form {

    width: 40%;
  
    .total-income {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-bottom: 0.8rem;
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .empty-income {
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
    
    .incomes { 
      width: 100%;

      .incomes-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      .empty-income {
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

export default Income