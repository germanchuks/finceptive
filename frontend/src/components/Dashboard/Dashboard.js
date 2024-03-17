import React from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import DisplayStats from './DisplayStats'
import { useGlobalContext } from '../../context/GlobalContext'

function Dashboard() {

  const { currentUserName } = useGlobalContext()

  return (
    <DashboardStyled>
      <InnerLayout>
        <div className="dashboard-container">
          <header className="welcome-box">
            Hi, {currentUserName}!
          </header>
          <section className="quick-stats">
            <DisplayStats />
          </section>
          <div className="recent-transactions">RECENT</div>
          <div className="right">
            <div className="total-spent-range">
              Total Spent
            </div>
            <div className="goal-progress">
              Goal
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
  height: 87vh;

  .dashboard-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    position: relative;
    height: 100%;
    gap: 0.5rem;

    .welcome-box {
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      font-size: 25px;
      padding-bottom: 10px;
      border-bottom: 1.5px solid #BBB7C4;
    }

    .quick-stats {
      display: flex;;
      align-items: center;
      width: 100%;
      gap: 1rem;
      justify-content: center;

    }

    .recent-transactions {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex: 1;
      border: 1px solid #000;
      border-radius: 20px;
    }
  }

    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 40%;
      justify-content: center;

      .total-spent-range {
        display: flex;
        height: 30%;
        width: 100%;
      }

      .goal-progress {
        display: flex;
        height: 30%;
        width: 100%;
      }
    }
`

export default Dashboard