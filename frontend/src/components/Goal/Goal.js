import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/GlobalContext'
import FormGoal from '../Form/FormGoal'
import GoalItem from './GoalItem'
import { dropIcon, hideIcon } from '../../utils/icons';
import { useMediaQuery } from "react-responsive";

function Goal() {

  const { currency, goals, getTotalAmount } = useGlobalContext()

  // Toggle form on small screen size
  const isMobile = useMediaQuery({ maxWidth: 750 });

  const [formOpen, setFormOpen] = useState(true)

  useEffect(() => {
    if (!isMobile) {
      setFormOpen(true)
    }
  }, [isMobile])

  return (
    <GoalStyled>
      <InnerLayout>
        <div className={formOpen ? "form" : "form-close"}>
          <div className="total-goal"><h6>Total Saved:</h6> {currency} {getTotalAmount(goals)}</div>
          <FormGoal />
        </div>
        <div className="goals">
          <div className="goals-header">
            <h4>All Goals</h4>
            {
              isMobile &&
              <div className="toggle-form" onClick={() => setFormOpen(!formOpen)}>
                {formOpen ? hideIcon : dropIcon} <small>{formOpen ? 'Hide form' : 'Show form'}</small>
              </div>
            }
          </div>
          {(!goals.length &&
            <div className="empty-goal">
              Create a new goal
            </div>)
            ||
            goals.map((goal) => {
              const { _id, title, targetAmount, description, category, targetDate, currentAmount, createdAt } = goal;
              return <GoalItem
                id={_id}
                title={title}
                targetAmount={targetAmount}
                currentAmount={currentAmount}
                description={description}
                category={category}
                targetDate={targetDate}
                createdAt={createdAt}
                key={_id}
                dashboard={false}
              />
            })}
        </div>

      </InnerLayout>
    </GoalStyled>
  )
}

const GoalStyled = styled.div`

  .form {
    width: 40%;
    
    .total-goal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-bottom: 0.8rem;
      border-radius: 10px;
      background-color: #4A5CFF;
      font-size: larger;
      color: #FFF;
      font-weight: bold;
      text-shadow: -2px -2px 6px rgba(0,0,0,0.66);
      box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
      
    }
  }

  .goals { 
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .empty-goal {
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
    
    .goals { 
      width: 100%;

      .goals-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      .empty-goal {
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

export default Goal