import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/GlobalContext'
import FormGoal from '../Form/FormGoal'
import GoalItem from './GoalItem'

function Goal() {

  const { currency, goals, getTotalAmount } = useGlobalContext()

  return (
    <GoalStyled>
      <InnerLayout>
        <div className="goal-container">
          <div className="form">
            <div className="total-goal"><h6>Total Saved:</h6> {currency} {getTotalAmount(goals)}</div>
            <FormGoal />
          </div>
          <div className="goals">
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

        </div>
      </InnerLayout>
    </GoalStyled>
  )
}

const GoalStyled = styled.div`
  overflow: auto;
  display: flex;


  .goal-container {
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
    
    .total-goal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin-block: 15px;
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
    overflow-y: scroll;
    height: 83vh;
    padding-inline: 1rem;
    display: flex;
    flex-direction: column;

    .empty-goal {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.3;
      padding-top: 30%;
    }
  }

  .goals::-webkit-scrollbar {
    display: none;
  }
`

export default Goal