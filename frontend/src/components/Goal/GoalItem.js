import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/GlobalContext';
import { ButtonStyled } from '../Form/FormComponentsStyled';
import ProgressBar from "@ramonak/react-progress-bar";
import { plus, deleteBin, note, othersIcon, goodIcon } from '../../utils/icons';
import { toast } from 'react-hot-toast';
import { goalCategories } from '../../utils/categoryItems';
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';


function GoalItem({
  id,
  title,
  targetAmount,
  currentAmount,
  targetDate,
  category,
  description,
  createdAt,
}) {

  const { currency, deleteGoal, currentUserId, getGoals, getUserBalance, availableBalance, addDeposit, deleteDeposit, getAllDeposits, getAllWithdrawals } = useGlobalContext()


  // Get Saving Deposits
  const getDeposits = async (payload) => {
    const response = await axios.get('get-deposits', {
      params: payload
    })
      .catch((error) => {
        console.log(error)
      })
    return response
  }

  // Toggle confirm delete pop up
  const [confirmBox, setConfirmBox] = useState(false)

  // Handle more content toggle button
  const [clicked, setClicked] = useState(false)

  // Deactivate add deposit button on click
  const [depositClicked, setDepositClicked] = useState(false)

  // Store deposit history for Goal Item
  const [goalDeposits, setGoalDeposits] = useState([]);

  // Get float available balance
  const balance = parseFloat(availableBalance)

  // Deposit state
  const [deposit, setDeposit] = useState('')

  // Handle deposit input
  const handleDepositChange = (e) => {
    // Allow only numbers and decimal point (optional)
    const validInput = e.target.value.replace(/[^0-9.]/g, '');
    setDeposit(validInput);
  }

  // Calculated amount needed
  const amountNeeded = targetAmount - currentAmount

  // Check for category icon
  const getCategoryIcon = (category) => {
    const matchingCategory = goalCategories.find(
      (item) => item.value === category
    );
    return matchingCategory ? matchingCategory.icon : othersIcon;

  };


  // Handle more content toggle
  const handleClick = () => {
    setClicked(!clicked);
  }


  // Handle Goal break
  const handleBreak = async () => {
    const response = await deleteGoal(id, { completed: false });
    if (response.data.error) {
      toast.error(response.data.error)
    } else {
      // Update user balance
      // const newBalance = balance + parseFloat(response.data.amount)
      // await updateBalance("income", newBalance);
      getUserBalance()

      // Update client with list of available goals
      getGoals();

      // Update all deposits state
      await getAllDeposits({
        userId: currentUserId
      })

      // Update all withdrawals state
      await getAllWithdrawals({
        userId: currentUserId
      })

      toast.success('Break successful. Amount has been added to your balance.')
    }
  }

  // Remove goal when target is met
  const removeGoal = async () => {
    const response = await deleteGoal(id, { completed: true });
    if (response.data.error) {
      toast.error(response.data.error)
    } else {
      // Update client with list of available goals
      getGoals();

      // Update all deposits state
      await getAllDeposits({
        userId: currentUserId
      })

      // Update all withdrawals state
      await getAllWithdrawals({
        userId: currentUserId
      })


      toast.success('Goal removed from list.')
    }
  }


  // Handle Goal Deposit
  const handleUpdate = async () => {
    if (isNaN(deposit) || deposit === "") {
      toast.error('Deposit must be a positive number.');
      return;
    }
    if (deposit <= 0) {
      toast.error('Deposit must be greater than 0')
      return;
    }
    if (deposit > amountNeeded) {
      toast.error('Deposit exceeds the amount needed')
      return;
    }
    if (deposit > balance) {
      toast.error('Insufficient balance 🥺😔')
      return;
    }

    // Deactivate button
    setDepositClicked(true)

    const response = await addDeposit({
      amount: deposit,
      userId: currentUserId,
      goalId: id
    })
    if (response.data.error) {
      toast.error(response.data.error)
    } else {
      getGoals();
      toast.success("Deposit successful 💰")

      // Update user balance (remove value from available balance)
      // const newBalance = balance - deposit
      // await updateBalance("goal", newBalance);

      getUserBalance();

      // Update all deposits state
      await getAllDeposits({
        userId: currentUserId
      })

      setDeposit('')
    }
    // Activate button on timeout
    setTimeout(() => {
      setDepositClicked(false)
    }, 2500);
  }

  // Handle Goal Deposit delete
  const handleDepositDelete = async (depositId) => {
    const response = await deleteDeposit(depositId);
    if (response.data.error) {
      toast.error(response.data.error)
    } else {
      // Update user balance (add value back to available balance)
      // const newBalance = balance + parseFloat(response.data.amount)
      // await updateBalance("income", newBalance);
      getUserBalance();

      getGoals();

      // Update all deposits state
      await getAllDeposits({
        userId: currentUserId
      })

      toast.success('Deposit removed')
    }
  }

  // Get deposit history for goal using id
  useEffect(() => {
    const fetchGoalDeposits = async () => {
      const response = await getDeposits({ goalId: id });
      if (response.data.error) {
        console.log(response.data.error)
      } else {
        setGoalDeposits(response.data);
      }
    }

    fetchGoalDeposits();
    // eslint-disable-next-line
  }, [getGoals, addDeposit])

  return (
    <GoalItemStyled >

      <div className="main-content">
        <div className="title">
          <h3>{title}</h3>
          <div className="icon">
            {getCategoryIcon(category)}
          </div>
        </div>
        <ProgressBar
          completed={((currentAmount / targetAmount) * 100).toFixed(0)}
          maxCompleted={100}
          bgColor='#3B66FF'
          height='30px'
          labelColor='#080E24'
          baseBgColor='#DEE5FF'
          borderRadius='15px'
          animateOnRender={true}
        />

        <div className="amount-container">
          <span className='target-amount'><b>Target:  </b>{currency}{targetAmount}</span>
          <span className='amount-needed'><b>Gap:  </b>{currency}{amountNeeded}</span>
        </div>

        <div className="date-container">
          <span className='start-date'><b>Started on:  </b>{createdAt.split('T')[0]}</span>
          <span className='due-date'><b>Due:  </b>{targetDate.split('T')[0]}</span>
        </div>

        <div className="more-content" style={{ display: clicked ? 'flex' : 'none' }}>
          <div className="left">
            <div className="description">
              {note} {description}
            </div>
            <br />
            <TextField
              label="Deposit"
              value={deposit}
              onChange={handleDepositChange}
              type={"text"}
              size="small"
              fullWidth={true}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {currency}
                  </InputAdornment>
                ),
                style: { fontSize: 14 }
              }}
              disabled={amountNeeded === 0 ? true : false}
            />
            <div className="update-btn">
              {
                (currentAmount !== targetAmount &&
                  <ButtonStyled style={{
                    backgroundColor: "#3B66FF",
                    color: "#FFF",
                    width: '100%',
                    height: '100%',
                    padding: "5px",
                    borderRadius: '20px',
                  }} onClick={handleUpdate} disabled={depositClicked}>
                    {plus} Deposit
                  </ButtonStyled>)
                ||
                <div className='completed'> {goodIcon} Completed</div>
              }
            </div>
          </div>
          <div className="right">
            <div className="recent-deposit">
              <b>Recent Deposits</b>
              <div className="deposits">
                {(!goalDeposits.length &&
                  <div className="no-history">No recent history</div>)
                  ||
                  goalDeposits.slice(0, 3).map((deposit) => {
                    const { _id, amount, date } = deposit
                    return <div className='deposit-item' key={_id}>
                      <span>{currency} {amount}</span>
                      <span>{date.split('T')[0]}</span>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDepositDelete(_id)}
                      >{deleteBin}</span>
                    </div>
                  })}
              </div>
            </div>

            <div className="break-goal-container">
              {
                (currentAmount < targetAmount &&
                  <div className="btn-container">
                    <ButtonStyled style={{
                      backgroundColor: "#DB1A24",
                      color: "#FFF",
                      width: '100%',
                      height: '100%',
                      padding: "5px",
                      borderRadius: '20px',
                    }} onClick={() => setConfirmBox(true)}>
                      Break
                    </ButtonStyled>
                    {confirmBox &&
                      <div className='confirm-break'>
                        <p>You are yet to meet your target. Are you sure?</p>
                        <div className="confirm-btns">
                          <ButtonStyled style={{
                            backgroundColor: "#E1E3F7",
                            color: '#000',
                            width: '100%',
                            height: '100%',
                            padding: "0.5rem",
                            borderRadius: '20px',
                          }} onClick={() => setConfirmBox(false)}>
                            Cancel
                          </ButtonStyled>

                          <ButtonStyled style={{
                            backgroundColor: "#000000",
                            width: '100%',
                            height: '100%',
                            padding: "0.5rem",
                            borderRadius: '20px',
                          }} onClick={handleBreak}>
                            Confirm
                          </ButtonStyled>
                        </div>
                      </div>
                    }
                  </div>)
                ||
                <div className='remove-goal'>
                  <ButtonStyled style={{
                    backgroundColor: "#DB1A24",
                    color: "#FFF",
                    width: '100%',
                    height: '100%',
                    padding: "5px",
                    borderRadius: '20px',
                  }} onClick={removeGoal}>
                    Remove from list
                  </ButtonStyled>
                </div>
              }
            </div>
          </div>
        </div>
        <span className='open-more' onClick={handleClick}>
          {clicked ? 'See less...' : 'See more...'}
        </span>
      </div>
    </GoalItemStyled >
  )
}

const GoalItemStyled = styled.div`
  background: #FFF;
  border: 1px solid #000;
  padding-block: 1.5rem;
  margin: 1rem 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  border-radius: 15px;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

  .title {
    display: flex;
    justify-content: space-between;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: none;
      width: 12%;
      height: 100%;
    }
  }

  .main-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.7rem;
    justify-content: space-evenly;
    color: #000 !important;
    padding-inline: 1.5rem;

    b {
      padding-right: 7px
    }

    .amount-container {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      font-weight: bolder;
      font-size: smaller;
      
      .target-amount {
        padding: 0.3rem;
        padding-inline: 0.7rem;
        background-color: #E3E3E3;
        color: #000;
        border-radius: 20px;
      }

      .amount-needed {
        padding: 0.3rem;
        padding-inline: 0.7rem;
        background-color: #E3E3E3;
        color: #000;
        border-radius: 20px;
      }
    }

    .date-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      font-size: smaller;

        .due-date {
          padding: 0.3rem;
          padding-inline: 0.7rem;
          background-color: #DB1A24;
          color: white;
          border-radius: 20px;
        }
        .start-date {
          padding: 0.3rem;
          padding-inline: 0.7rem;
          background-color: #E3E3E3;
          color: #000;
          border-radius: 20px;
        }
    }
    .open-more {
      font-style: italic;
      text-decoration: underline;
      font-size: 11px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    
    }
  }

  .more-content {
    transition: display .5s ease-in-out;
    width: 100%;
    display: flex;
    gap: 1rem;
    padding-top: 1rem;

    .left {
      width: 50%;

      .description {
        display: flex;
        gap: 0.4rem;
        padding: 0.2rem;
        font-weight: lighter;
        background-color: #E3E3E3;
        font-size: small;
        border: 1px solid grey;
        opacity: 0.6;
        border-radius: 5px;
        height: 50px;
      }
  
      .update-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
  
        &:hover {
          opacity: 0.8;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;

      .recent-deposit {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        border: 1px solid #C9C9C9;
        padding: 0.5rem;
        border-radius: 10px;
        height: 100%;
        font-size: small;

        .deposits {
          font-size: smaller;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;

          .no-history {
            opacity: 0.6;
            top: 30%;
          }

          .deposit-item {
            display: flex;
            justify-content: space-between;
            gap: 0.5rem;
            align-items: center;
            font-size: smaller;
            background-color: #E3E3E3;

          }
        }

      }
      .break-goal-container {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        width: 100%;
        justify-content: flex-end;
        
        .btn-container {
          display: flex;
          width: 60%;

          .confirm-break {
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
            gap: 1rem;
            top: 30%;
            left: 10%;
            border-radius: 10px;
            justify-content: center;
            align-items: center;
            background-color: #D5D7EB;
            position: absolute;

            .confirm-btns {
              display: flex;
              gap: 0.8rem;

            }

          }
        }
      }
    }

    .completed {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
      background-color: #8FC796;
      padding: 0.3rem;
    }
  }
  
  @media (max-width: 430px) {
    font-size: 80% !important;
  }
`;

export default GoalItem