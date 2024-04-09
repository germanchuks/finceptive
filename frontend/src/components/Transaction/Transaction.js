import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/GlobalContext'
import IncomeItem from '../Income/IncomeItem'
import ExpenseItem from '../Expense/ExpenseItem'
import DepositItem from '../Goal/DepositItem';
import WithdrawalItem from '../Goal/WithdrawalItem'
import TransactionFilter from './TransactionFilter'
import { dropIcon, hideIcon } from '../../utils/icons';
import { useMediaQuery } from "react-responsive";


function Transaction() {
  const { transactions, incomes, expenses, depositHistory, withdrawalHistory, sortByDate, filterClicked, filter, setTransactions } = useGlobalContext()

  // Toggle filter on small screen size
  const isMobile = useMediaQuery({ maxWidth: 750 });

  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) {
      setFilterOpen(true)
    }
  }, [isMobile])


  /// Transaction Filter Function
  const filteredTransactions = transactions.filter((transaction) => {
    const { amount, date } = transaction;
    const { minAmount, maxAmount, minDate, maxDate } = filter || {};

    const trDate = new Date(date);

    // Conditional checks based on payload properties
    let amountInRange = true; // Assume all transactions are in range initially
    let dateInRange = true;


    // Test filter conditions are met
    if (minAmount !== '') {
      amountInRange = amount >= minAmount;
    }
    if (maxAmount !== '') {
      amountInRange = amount <= maxAmount;
    }
    if (minAmount !== '' && maxAmount !== '') {
      amountInRange = amount >= minAmount && amount <= maxAmount
    }
    if (minDate !== '') {
      dateInRange = trDate >= minDate && trDate <= maxDate;
    }
    return amountInRange && dateInRange;
  });

  // Get all transactions
  useEffect(() => {
    const combineTransactions = () => {
      const allTransactions = [...incomes, ...expenses, ...depositHistory, ...withdrawalHistory];
      return sortByDate(allTransactions);
    };


    const sortedTransactions = combineTransactions();

    setTransactions(sortedTransactions);
    if (filterClicked === true) {
      setTransactions(filteredTransactions)
    }
    // eslint-disable-next-line
  }, [incomes, expenses, depositHistory, withdrawalHistory, filterClicked]);



  return (
    <TransactionStyled>
      <InnerLayout>
        <div className={(filterOpen || !isMobile) ? "filter" : "filter-close"}>
          <TransactionFilter />
        </div>
        <div className="transactions">
          <div className="transactions-header">
            <h4>All Transactions</h4>
            {
              isMobile &&
              <div className="toggle-filter" onClick={() => setFilterOpen(!filterOpen)}>
                {filterOpen ? hideIcon : dropIcon} <small>{filterOpen ? 'Hide filter' : 'Show filter'}</small>
              </div>
            }
          </div>
          {
            (!transactions.length &&
              <div className="empty-transaction">
                <span>No transaction</span>
              </div>)
            ||
            transactions.slice(0, 20).map((transaction) => {
              const { _id, title, amount, date, category, type, completed } = transaction
              return (
                <div className="transaction-item" key={_id}>
                  {
                    (type === "income" &&
                      <IncomeItem
                        title={title}
                        amount={amount}
                        category={category}
                        date={date}
                        key={_id}
                        dashboard={true}
                      />)
                    ||
                    (type === "expense" &&
                      <ExpenseItem
                        title={title}
                        amount={amount}
                        category={category}
                        date={date}
                        key={_id}
                        dashboard={true}
                      />)
                    ||
                    (type === "withdrawal" &&
                      <WithdrawalItem
                        title={title}
                        amount={amount}
                        date={date}
                        completed={completed}
                        key={_id}
                      />)
                    ||
                    <DepositItem
                      title={title}
                      amount={amount}
                      date={date}
                      key={_id}
                    />
                  }

                </div>
              )
            })}
        </div>
      </InnerLayout>
    </TransactionStyled>
  )
}

const TransactionStyled = styled.div`

.transactions { 
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .empty-transaction {
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
  
  /* Large Screen */
  @media (min-width: 750px) {
    overflow: auto;
    
    .transactions::-webkit-scrollbar {
        display: none;
      }
    
    .filter {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 35%;
      overflow: auto;
    }

    .transactions { 
      overflow-y: scroll;
      padding-inline: 1rem;

      .transactions-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
      .empty-transaction {
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

  /* Small Screen */
  @media (max-width: 750px) {
    position: relative;
  
    .filter {
      
      opacity: 1;
      height: auto;
      width: 100%;
      padding-inline: .5rem;

    }

    .filter-close {
      transition: all 3s linear;
      opacity: 0;
      height: 0;
      overflow: hidden;
    }

    .toggle-filter {
      display: flex;
      align-items: center;
    }
    
    .transactions { 
      width: 100%;
      .transactions-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      .empty-transaction {
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

export default Transaction