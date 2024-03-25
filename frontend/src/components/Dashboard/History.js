import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalContext';
import IncomeItem from '../Income/IncomeItem'
import ExpenseItem from '../Expense/ExpenseItem'
import DepositItem from '../Goal/DepositItem';
import WithdrawalItem from '../Goal/WithdrawalItem';

function History() {

    const { transactions, incomes, expenses, depositHistory, withdrawalHistory, sortByDate, setTransactions } = useGlobalContext();

    // Get all transactions
    useEffect(() => {
        const combineTransactions = () => {
            const allTransactions = [...incomes, ...expenses, ...depositHistory, ...withdrawalHistory];
            return sortByDate(allTransactions);
        };


        const sortedTransactions = combineTransactions();
        setTransactions(sortedTransactions);
        // eslint-disable-next-line
    }, [incomes, expenses, depositHistory, withdrawalHistory]);

    return (
        <HistoryStyled>
            <h5>Recent Transactions</h5>
            {(!transactions.length &&
                <div className="empty-transaction">
                    <span>No recent transactions</span>
                </div>)
                ||
                transactions.slice(0, 3).map((transaction) => {
                    const { _id, title, amount, date, category, type } = transaction
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
                                        type={type}
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
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    
    .empty-transaction {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.5;
        width: 100%;
        flex: 1;
        font-size: medium;
    }

    &::-webkit-scrollbar {
    display: none;
    }

    .transaction-item {
        height: 70px;
    }

`;

export default History