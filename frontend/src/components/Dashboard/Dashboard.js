import React from 'react'
import styled from 'styled-components'
import DisplayStats from './DisplayStats'
import { useGlobalContext } from '../../context/GlobalContext'
import History from './History'
import GoalProgress from './GoalProgress'
import moment from 'moment';


function Dashboard() {

  const { currentUserName } = useGlobalContext()
  let currentDate = moment().format('MMMM Do, YYYY');

  return (
    <DashboardStyled>
      <header className="welcome-box">
        <b>Hi, {currentUserName}!</b>
        <p className='date'>{currentDate}</p>
      </header>
      <section className="quick-stats">
        <DisplayStats />
      </section>
      <div className="history-stats">
        <div className="recent-transactions">
          <History />
        </div>
        <div className="goal-progress">
          <GoalProgress />
        </div>
      </div>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .welcome-box {
    border-bottom: 1.5px solid #BBB7C4;
    flex: 0.3;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .date{
      font-size: small;
    }
  }
  
  .quick-stats {
    display: flex;
    align-items: center;
    width: 100%;
    flex: 1.2;
    gap: 1rem;
    justify-content: center;

  }
  
  .history-stats {
    display: flex;
    gap: 2rem;
    padding-top: 1rem;
    flex: 3;

    .recent-transactions {
      display: flex;
      flex: 1.5;
      justify-content: center;
      border-radius: 20px;
    }

    .goal-progress {
      display: flex;
      flex: 1;
    }

  }

  /* Large Screen */
  @media (min-width: 750px) {

    overflow: auto;
    display: flex;
    height: 85vh;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    
    .quick-stats {
      padding-block: 0.8rem;
      }

    .history-stats {
      border-top: 1px solid grey;
    }
  }

  /* Small Screen */
  @media (max-width: 750px) {
    padding: 1rem 1.2rem 4.5rem;

    .quick-stats {
      padding-top: 0.5rem;
    }

    .history-stats {
      flex-direction: column;
      padding-bottom: 3rem;
    }
  }
`

export default Dashboard