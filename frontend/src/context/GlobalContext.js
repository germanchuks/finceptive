import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    //Save current user state
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for active session
    // useEffect(() => {
    //     const fetchCurrentUser = async () => {
    //         try {

    //             const response = await axios.get('/user');
    //             if (response.data.error) {
    //                 toast.error('Session ended. Please enter username and password')
    //             } else {
    //                 // Set authenticatication
    //                 setIsAuthenticated(true)
    //                 // Set User Id
    //                 setCurrentUserId(response.data.id)
    //                 //Set User Name
    //                 setCurrentUserName(response.data.username)

    //                 toast.success('Welcome back!')

    //             }
    //         } catch (error) {
    //             setError(error)

    //         }
    //     }
    //     fetchCurrentUser();
    // }, [])


    // Save preferred currency state
    const [currency, setCurrency] = useState("₦")

    // Success dialog display
    const [showSuccess, setShowSuccess] = useState({ show: false, message: '' });

    //Current navigation bar
    const [active, setActive] = useState(1)

    const [transactions, setTransactions] = useState([])
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [goals, setGoals] = useState([])
    const [error, setError] = useState(null)


    //----------------------------AUTHENTICATION------------------//

    // Handle User Login
    const login = async (inputs) => {
        const response = await axios.post('auth/login', inputs)
        console.log(response)
        return response;
    }

    // Handle User Logout
    const logout = async () => {
        await axios.post('auth/logout')
        setCurrentUserName(null);
        setCurrentUserId(null);
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
            .catch((error) => {
                setError(error.response.data.message)
            })
        getIncomes()
        setShowSuccess({ show: true, message: 'Income added successfully!' })
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
            .catch((error) => {
                setError(error.response.data.message)
            })
        getIncomes()
        setShowSuccess({ show: true, message: 'Income deleted successfully!' })

    }



    //------------------- EXPENSE API CALLS---------------------//

    // Add Expense
    const addExpense = async (expense) => {
        const response = await axios.post('add-expense', expense)
            .catch((error) => {
                setError(error.response.data.message)
            })
        getExpenses()
        setShowSuccess({ show: true, message: 'Expense added successfully!' })
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
            .catch((error) => {
                setError(error.response.data.message)
            })
        getExpenses()
        setShowSuccess({ show: true, message: 'Expense deleted successfully!' })
    }



    //------------------- GOAL API CALLS---------------------//

    // Add Goal
    const addGoal = async (goal) => {
        const response = await axios.post('add-goal', goal)
            .catch((error) => {
                setError(error.response.data.message)
            })
        getGoals()
        setShowSuccess({ show: true, message: 'Goal added successfully!' })
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
        setGoals(response)
        // setGoals(response.data)
    }

    // Delete Goals
    const deleteGoal = async (id) => {
        const response = await axios.delete(`delete-goal/${id}`)
            .catch((error) => {
                setError(error.response.data.message)
            })
        getGoals()
        setShowSuccess({ show: true, message: 'Goal deleted successfully!' })
    }


    // Get total amount for a transaction type
    const getTotalAmount = (data) => {
        if (data) {
            return data.reduce((total, item) => total + item.amount, 0);
        } else {
            return 0;
        }
    };


    // Remove success notification window after 4secs.
    useEffect(() => {
        setTimeout(() => setShowSuccess(false), 4000);
    }, [showSuccess])

    return (
        <GlobalContext.Provider value={{
            isAuthenticated, setIsAuthenticated,
            currentUserName, setCurrentUserName, currentUserId, setCurrentUserId,
            login, logout, register,
            active, setActive,
            showSuccess, setShowSuccess,
            currency,
            addIncome, incomes, setIncomes, getIncomes, deleteIncome,
            addExpense, expenses, setExpenses, getExpenses, deleteExpense,
            addGoal, goals, setGoals, getGoals, deleteGoal,
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