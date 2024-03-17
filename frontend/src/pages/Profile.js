import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import NavigationMenu from "../components/NavigationMenu/NavigationMenu";
import Dashboard from "../components/Dashboard/Dashboard";
import Income from "../components/Income/Income";
import Expense from "../components/Expense/Expense";
import Goal from "../components/Goal/Goal";
import Setting from "../components/Setting/Setting";
import Transaction from "../components/Transaction/Transaction";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {

    const { active, setActive, setExpenses, setIncomes, isAuthenticated, currentUserId, setError } = useGlobalContext();

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
            <NavigationMenu active={active} setActive={setActive} />
            <main>
                {showData()}
            </main>
        </ProfileStyled>
    )
}

const ProfileStyled = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;

    main {
        flex: 1;
        background-color: #F2F5FF;
        color: rgba(0, 0, 0, 1);
        height: 100%;
        overflow-x: hidden;
        &::-webkit-scrollbar{
        width: 0;
        }
    }
`

export default Profile