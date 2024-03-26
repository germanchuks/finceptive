import React from 'react';
import styled from 'styled-components';
import { calender, withdrawIcon } from '../../utils/icons';
import { useGlobalContext } from '../../context/GlobalContext';

function WithdrawalItem({
  title,
  amount,
  date,
  completed
}) {

  const { currency } = useGlobalContext()
  return (
    <WithdrawalItemStyled>
      <div className="main-content">
        <div className="icon">
          {withdrawIcon}
        </div>
        <div className="info-container">
          <h5 className="title">Withdrawn from savings - {title} {completed ? '(Completed)' : '(Early break)'}</h5>
          <span className="date-container">
            {calender} {date.substring(0, 10).slice('T')}
          </span>
        </div>
        <div className="amount"> {currency} {amount} </div>
      </div>
    </WithdrawalItemStyled>
  )
}

const WithdrawalItemStyled = styled.div`
background: #FFF;
  border: 1px solid #000;
  padding: 0.5rem;
  margin-block: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;


  .icon {
    display: flex;
    align-items: center;
    border-radius: 50%;
    border: none;
  }

  .main-content {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    padding-inline: 10px;

    .icon {
      flex: 1;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      flex: 8;
      gap: 0.2rem;

      .title {
        font-weight: bolder;
        font-size: 15px;
      }

      .date-container {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        font-weight: lighter;
        font-size: 12px;
      }
    }

    .amount {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: bold;
      color: #4A5CFF;
      font-size: medium;
    }
  }
`

export default WithdrawalItem