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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainLayout, InnerLayout } from "../styles/Layout";

function Profile() {

    const { active, setActive, setAvailableBalance, setExpenses, setIncomes, setGoals, isAuthenticated, currentUserId, setError } = useGlobalContext();

    // Fetch user data on load;
    useEffect(() => {
        const fetchUser = async () => {

            if (isAuthenticated) {
                //fetch expense
                const expenses = await axios.get('get-expenses', {
                    params: {
                        userId: currentUserId
                    }
                })
                    .catch((error) => {
                        setError(error.response.data.message)
                    })
                setExpenses(expenses.data)

                //Fetch income
                const incomes = await axios.get('get-incomes', {
                    params: {
                        userId: currentUserId
                    }
                })
                    .catch((error) => {
                        setError(error.response.data.message)
                    })
                setIncomes(incomes.data)

                //Fetch goals
                const goals = await axios.get('get-goals', {
                    params: {
                        userId: currentUserId
                    }
                })
                    .catch((error) => {
                        setError(error.response.data.message)
                    })
                setGoals(goals.data)

                //Fetch balance
                const userBalance = await axios.get(`get-balance/${currentUserId}`)
                    .catch((error) => {
                        setError(error.response.data.message)
                    })
                setAvailableBalance(userBalance.data.balance)

            }
        }

        fetchUser();
    }, [])

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
            <Header />
            <MainLayout>
                <NavigationMenu active={active} setActive={setActive} />
                <div className="content">
                    {showData()}
                </div>
            </MainLayout>
        </ProfileStyled>
    )
}

const ProfileStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;

    .content {
        flex: 1;
        background-color: #F2F5FF;
        color: black !important;
        height: 100%;
        overflow-x: hidden;
        &::-webkit-scrollbar{
        width: 0;
        }
    }
`

export default Profile