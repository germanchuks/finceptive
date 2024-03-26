import React, { useState } from 'react'
import { calender, deleteBin, note, othersIcon } from '../../utils/icons';
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext';
import { ButtonStyled } from '../Form/FormComponentsStyled';
import { incomeCategories } from '../../utils/categoryItems';
import { toast } from 'react-hot-toast';

function IncomeItem({
  id,
  title,
  amount,
  description,
  category,
  date,
  dashboard
}) {

  const { currency, deleteIncome, getIncomes, getUserBalance } = useGlobalContext()


  // const balance = parseFloat(availableBalance)

  // Check for category icon
  const getCategoryIcon = (category) => {

    const matchingCategory = incomeCategories.find(
      (item) => item.value === category
    );
    return matchingCategory ? matchingCategory.icon : othersIcon;

  };

  // Transaction item size reset on click
  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(!clicked);
  }

  const handleDelete = async () => {
    const response = await deleteIncome(id);
    if (response.data.error) {
      toast.error(response.data.error)
    } else {
      // Update user balance
      // const newBalance = balance - parseFloat(response.data.amount)
      // await updateBalance("expense", newBalance);
      getUserBalance();
      getIncomes();
      toast.success('Income Deleted')
    }
  }

  return (
    <IncomeItemStyled>
      <div className="main-content">
        <div className="icon">
          {getCategoryIcon(category)}
        </div>
        <div className="info-container">
          <h5 className="title" >{title}</h5>
          <span className="date">
            {calender} {date.substring(0, 10)}
            {!dashboard &&
              <span
                className='open-more'
                onClick={handleClick}
              >
                {clicked ? 'See less...' : 'See more...'}
              </span>}
          </span>
        </div>
        <div className="amount">+ {currency} {amount} </div>
      </div>
      <div className="more-content" style={{
        display: clicked ? 'flex' : 'none'
      }}>
        <div className="description">
          {note} {description}
        </div>
        <div className="delete-btn">
          <ButtonStyled style={{
            backgroundColor: "#ED4545",
            color: "#FFF",
            borderRadius: "50%",
            padding: "5px",
          }} onClick={handleDelete}>
            {deleteBin}
          </ButtonStyled>
        </div>
      </div>
    </IncomeItemStyled>
  )
}

const IncomeItemStyled = styled.div`
  background: #FFF;
  border: 1px solid #000;
  padding: 0.5rem;
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
    gap: 0.3rem;
    justify-content: space-evenly;
    padding-inline: 10px;

    .icon {
      width: 7%;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      width: 68%;

      .title {
        font-weight: bolder;
        font-size: 15px;
      }

      .date {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        font-weight: lighter;
        font-size: 12px;

        .open-more {
          font-style: italic;
          text-decoration: underline;
          font-size: 11px;
          padding-inline: 20px;
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }

    .amount {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: bold;
      font-size: medium;
      color: #4caf50;
    }
     
  }

  .more-content {
    transition: display .5s ease-in-out;
    width: 100%;
    display: flex;
    align-items: center;
    padding-inline: 10px;
    padding-left: 60px;
    justify-content: space-between;

    .description {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 13px;
      font-style: italic;
      font-weight: lighter;
    }

    .delete-btn {
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

export default IncomeItem