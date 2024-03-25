import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
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
      <InnerLayout>
        <div className="dashboard-container">
          <header className="welcome-box">
            <b>Hi, {currentUserName}!</b>
            <p className='date'>{currentDate}</p>
          </header>
          <section className="quick-stats">
            <DisplayStats />
          </section>
          <div className="other-stats">
            <div className="recent-transactions">
              <History />
            </div>
            <div className="goal-progress">
              <GoalProgress />
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
  overflow: auto;
  display: flex;
  height: 85vh;

  .dashboard-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 0.5rem;

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

    .other-stats {
      display: flex;
      border-top: 1px solid grey;
      gap: 1.5rem;
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
  }
`

export default Dashboard