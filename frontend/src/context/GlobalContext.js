import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    //Save current user state
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Save preferred currency state
    const [currency, setCurrency] = useState("₦")

    //Current navigation bar
    const [active, setActive] = useState(1)

    // const [transactions, setTransactions] = useState([])
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [goals, setGoals] = useState([])
    const [error, setError] = useState(null)

    // Handle balance updates
    const [availableBalance, setAvailableBalance] = useState();


    // Update balance 
    const updateBalance = async (category, amount) => {
        const payload = { amount: amount }
        if (category === "income") {
            try {
                const response = await axios.put(`/increase-balance/${currentUserId}`, payload)
                setAvailableBalance(response.data.balance);
                return response;

            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await axios.put(`/decrease-balance/${currentUserId}`, payload)
                setAvailableBalance(response.data.balance);
                return response;
            } catch (error) {
                console.log(error)
            }
        }
    }


    //----------------------------AUTHENTICATION------------------//

    // Handle User Login
    const login = async (inputs) => {
        const response = await axios.post('auth/login', inputs)
        return response;
    }

    // Handle User Logout
    const logout = async () => {
        await axios.post('auth/logout')
        setCurrentUserName(null);
        setCurrentUserId(null);
        setAvailableBalance(0);
        setIsAuthenticated(false);
    }

    // Handle User Registration
    const register = async (inputs) => {
        return await axios.post('auth/register', inputs)

    }


    //------------------- INCOME API CALLS---------------------//

    //Add Income
    const addIncome = async (income) => {
        const response = await axios.post('add-income', income)
        return response
    }

    //Get Incomes
    const getIncomes = async () => {
        const response = await axios.get('get-incomes', {
            params: {
                userId: currentUserId
            }
        })
            .catch((error) => {
                setError(error.response.data.message)
            })
        setIncomes(response.data)
    }

    //Delete Income
    const deleteIncome = async (id) => {
        const response = await axios.delete(`delete-income/${id}`)
        return response
    }



    //------------------- EXPENSE API CALLS---------------------//

    // Add Expense
    const addExpense = async (expense) => {
        const response = await axios.post('add-expense', expense)
        return response
    }

    // Get expense
    const getExpenses = async () => {
        const response = await axios.get('get-expenses', {
            params: {
                userId: currentUserId
            }
        })
            .catch((error) => {
                setError(error.response.data.message)
            })
        setExpenses(response.data)
    }

    // Delete Expense
    const deleteExpense = async (id) => {
        const response = await axios.delete(`delete-expense/${id}`)
        return response
    }



    //------------------- GOAL API CALLS---------------------//

    // Add Goal
    const addGoal = async (goal) => {
        const response = await axios.post('add-goal', goal)
        return response
    }

    // Get Goals
    const getGoals = async () => {
        const response = await axios.get('get-goals', {
            params: {
                userId: currentUserId
            }
        })
            .catch((error) => {
                setError(error.response.data.message)
            })
        setGoals(response.data)
    }

    // Delete Goal
    const deleteGoal = async (id) => {
        const response = await axios.delete(`delete-goal/${id}`)
        return response
    }

    // Update Goal
    const updateGoal = async (id, input) => {
        const response = await axios.put(`update-goal/${id}`, input)
        return response
    }


    // Get total amount for a transaction type
    const getTotalAmount = (data) => {
        if (data.length) {
            if (data == goals) {
                return data.reduce((total, item) => total + item.currentAmount, 0);
            } else {
                return data.reduce((total, item) => total + item.amount, 0);
            }
        } else {
            return 0;
        }
    };


    // Get transactions list sorted by date
    const sortByDate = (data) => {
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    };

    const transactionHistory = () => {
        const transactions = [...incomes, ...expenses]
        const sortedTransactions = sortByDate(transactions);
        return sortedTransactions;
    }

    const userGoals = () => {
        const sortedGoals = sortByDate(goals);
        return sortedGoals;
    }

    return (
        <GlobalContext.Provider value={{
            isAuthenticated, setIsAuthenticated,
            currentUserName, setCurrentUserName, currentUserId, setCurrentUserId,
            login, logout, register,
            active, setActive,
            currency,
            transactionHistory, userGoals,
            updateBalance, availableBalance, setAvailableBalance,
            addIncome, incomes, setIncomes, getIncomes, deleteIncome,
            addExpense, expenses, setExpenses, getExpenses, deleteExpense,
            addGoal, goals, setGoals, getGoals, deleteGoal, updateGoal,
            getTotalAmount,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}