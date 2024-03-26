import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layout'
import { useGlobalContext } from '../../context/GlobalContext'
import IncomeItem from '../Income/IncomeItem'
import ExpenseItem from '../Expense/ExpenseItem'
import DepositItem from '../Goal/DepositItem';
import WithdrawalItem from '../Goal/WithdrawalItem'
import TransactionFilter from './TransactionFilter'


function Transaction() {
  const { transactions, incomes, expenses, depositHistory, withdrawalHistory, sortByDate, filterClicked, filter, setTransactions } = useGlobalContext()

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
      dateInRange = trDate >= minDate;
    }
    if (maxDate !== '') {
      dateInRange = trDate <= maxDate;
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
        <div className="transaction-container">
          <div className="filter">
            <TransactionFilter />
          </div>
          <div className="transactions">
            <h4>All Transactions</h4>
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
        </div>
      </InnerLayout>
    </TransactionStyled>
  )
}

const TransactionStyled = styled.div`
  overflow: auto;
  display: flex;

  .transaction-container {
    display: flex;
    gap: 2.5rem;
    position: relative;

  }
  
  .filter {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 35%;
    
  }

  .transactions { 
    flex: 1;
    overflow-y: scroll;
    height: 83vh;
    padding-inline: 1rem;

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

  .transactions::-webkit-scrollbar {
    display: none;
  }
`

export default Transaction