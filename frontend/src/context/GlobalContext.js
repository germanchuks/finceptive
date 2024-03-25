import { createContext, useContext, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    //Save current user state
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [currentAvatar, setCurrentAvatar] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Save preferred currency state
    const [currency, setCurrency] = useState('')

    //Current navigation bar
    const [active, setActive] = useState(1)

    // Manage transactions and search filters
    const [transactions, setTransactions] = useState([])
    const [filter, setFilter] = useState()
    const [filterClicked, setFilterClicked] = useState()

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [goals, setGoals] = useState([])
    const [depositHistory, setDepositHistory] = useState([])
    const [withdrawalHistory, setWithdrawalHistory] = useState([])
    const [budgets, setBudgets] = useState([])

    // Handle balance updates
    const [availableBalance, setAvailableBalance] = useState();


    // Get balance
    const getUserBalance = async () => {
        try {
            const response = await axios.get(`/get-balance/${currentUserId}`)
            setAvailableBalance(response.data.balance);
        } catch (error) {
            console.log(error)
        }
    }

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
        setCurrentAvatar('');
        setIncomes([]);
        setExpenses([]);
        setGoals([]);
        setDepositHistory([]);
        setWithdrawalHistory([]);
        setBudgets([])
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
        const response = await axios.post(`add-income/${currentUserId}`, income)
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
                toast.error(error.response.data.message)
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
        const response = await axios.post(`add-expense/${currentUserId}`, expense)
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
                toast.error(error.response.data.message)
            })
        setExpenses(response.data)
    }

    // Delete Expense
    const deleteExpense = async (id) => {
        const response = await axios.delete(`delete-expense/${id}`)
        return response
    }



    //------------------- GOAL API ENDPOINTS---------------------//

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
                toast.error(error.response.data.message)
            })
        setGoals(response.data)
    }

    // Delete Goal
    const deleteGoal = async (id, payload) => {
        const response = await axios.delete(`delete-goal/${id}`, {
            params: payload
        })
        return response
    }

    //----------------------Goals API endpoints--------------------//
    // Add Saving Deposit
    const addDeposit = async (payload) => {
        const response = await axios.post('add-deposit', payload)
        return response
    }

    // Get Saving Deposits
    const getAllDeposits = async (payload) => {
        const response = await axios.get('get-deposits', {
            params: payload
        })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
        setDepositHistory(response.data)
        return response
    }

    // Delete Saving Deposit
    const deleteDeposit = async (id) => {
        const response = await axios.delete(`delete-deposit/${id}`)
        return response
    }


    // Get Saving Deposits
    const getAllWithdrawals = async (payload) => {
        const response = await axios.get('get-withdrawals', {
            params: payload
        })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
        setWithdrawalHistory(response.data)
        return response
    }


    // Get user budgets
    const getBudgets = async () => {
        const response = await axios.get('get-budgets', {
            params: {
                userId: currentUserId
            }
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
        setBudgets(response.data)
        return response
    }

    // Get total amount for a transaction type
    const getTotalAmount = (data) => {
        if (data.length) {
            if (data === goals) {
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

    // Sort User Goals
    const userGoals = () => {
        const sortedGoals = sortByDate(goals);
        return sortedGoals;
    }

    return (
        <GlobalContext.Provider value={{
            isAuthenticated, setIsAuthenticated,
            currentUserName, setCurrentUserName, currentUserId, setCurrentUserId,
            currentAvatar, setCurrentAvatar,
            login, logout, register,
            active, setActive,
            currency, setCurrency,
            userGoals,
            sortByDate,
            filter, setFilter, filterClicked, setFilterClicked,
            transactions, setTransactions,
            updateBalance, getUserBalance, availableBalance, setAvailableBalance,
            addIncome, incomes, setIncomes, getIncomes, deleteIncome,
            addExpense, expenses, setExpenses, getExpenses, deleteExpense,
            addGoal, goals, setGoals, getGoals, deleteGoal,
            addDeposit, getAllDeposits, deleteDeposit, depositHistory, setDepositHistory,
            getAllWithdrawals, withdrawalHistory, setWithdrawalHistory,
            budgets, setBudgets, getBudgets,
            getTotalAmount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}