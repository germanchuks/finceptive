import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import NavigationMenu from "../components/NavigationMenu/NavigationMenu";
import Header from '../components/Header/Header';
import Dashboard from "../components/Dashboard/Dashboard";
import Income from "../components/Income/Income";
import Expense from "../components/Expense/Expense";
import Goal from "../components/Goal/Goal";
import Setting from "../components/Setting/Setting";
import Transaction from "../components/Transaction/Transaction";
import axios from "axios";
import { MainLayout } from "../styles/Layout";
import AlertDialog from '../components/Notification/Notification';
import { useNavigate } from 'react-router-dom';


function Profile() {

    const {
        active, setActive,
        logout,
        setCurrency, setCurrentAvatar,
        setAvailableBalance, setExpenses, setIncomes, setGoals, setBudgets,
        isAuthenticated, currentUserId, setError,
        setDepositHistory, setWithdrawalHistory } = useGlobalContext();

    // Fetch user data on load;
    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated) {
                //Fetch balance
                const getInfo = await axios.get(`get-info/${currentUserId}`)
                    .catch((error) => {
                        console.log(error.response.data.message)
                    })
                setAvailableBalance(getInfo.data.balance)
                setCurrentAvatar(getInfo.data.avatar)
                setCurrency(getInfo.data.currency)

                //fetch expense
                const expenses = await axios.get('get-expenses', {
                    params: {
                        userId: currentUserId
                    }
                })
                    .catch((error) => {
                        console.log(error.response.data.message)
                    })
                setExpenses(expenses.data)

                //Fetch income
                const incomes = await axios.get('get-incomes', {
                    params: {
                        userId: currentUserId
                    }
                })
                    .catch((error) => {
                        console.log(error.response.data.message)
                    })
                setIncomes(incomes.data)

                //Fetch goals
                const goals = await axios.get('get-goals', {
                    params: {
                        userId: currentUserId
                    }
                })
                    .catch((error) => {
                        console.log(error.response.data.message)
                    })
                setGoals(goals.data)


                // Fetch all withdrawal history
                const withdrawalHistory = await axios.get('get-withdrawals', {
                    params: {
                        userId: currentUserId
                    }
                })
                    .catch((error) => {
                        setError(error.response.data.message)
                    })
                setWithdrawalHistory(withdrawalHistory.data)


                // Fetch all deposit history
                const depositHistory = await axios.get('get-deposits', {
                    params: {
                        userId: currentUserId
                    }
                })
                    .catch((error) => {
                        console.log(error.response.data.message)
                    })
                setDepositHistory(depositHistory.data)


                // Fetch budgets
                const userBudgets = await axios.get('get-budgets', {
                    params: {
                        userId: currentUserId
                    }
                })
                    .catch((error) => {
                        console.log(error.response.data.message)
                    })
                setBudgets(userBudgets.data)
            }
        }

        fetchUser();
        // eslint-disable-next-line
    }, [])

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false)

    const handleSignOut = () => {
        logout()
        navigate('/');
    }

    const showData = () => {
        switch (active) {
            case 'Dashboard':
                return <Dashboard />
            case 'Transactions':
                return <Transaction />
            case 'Income':
                return <Income />
            case 'Expenses':
                return <Expense />
            case 'Goals':
                return <Goal />
            case 'Settings':
                return <Setting />
            default:
                return <Dashboard />
        }
    }


    return (
        <ProfileStyled>
            <Header showAlert={showAlert} setShowAlert={setShowAlert} />
            <MainLayout>
                <NavigationMenu active={active} setActive={setActive} showAlert={showAlert} setShowAlert={setShowAlert} />

                <div className="content">
                    {showData()}
                </div>
                {showAlert && <AlertDialog showAlert={showAlert} setShowAlert={setShowAlert} title="Sign Out" contextText="Are you sure?" actionTrue={() => handleSignOut()} />}
            </MainLayout>
        </ProfileStyled>
    )
}

const ProfileStyled = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;

    .content {
        flex: 1;
        background-color: #F2F5FF;
        color: black !important;
        overflow-x: hidden;
        &::-webkit-scrollbar{
        }
    }

    .alert {
        position: absolute;
        top: 40%;
        left: 50%;
        color: black !important;
    }
`

export default Profile