import { dashboard, transaction, income, expenses, goals, settings } from './icons';

const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: 'Transactions',
        icon: transaction,
        link: '/transactions'
    },
    {
        id: 3,
        title: 'Income',
        icon: income,
        link: '/income'
    },
    {
        id: 4,
        title: 'Expenses',
        icon: expenses,
        link: '/expenses'
    },
    {
        id: 5,
        title: 'Goals',
        icon: goals,
        link: '/goals'
    },
    {
        id: 6,
        title: 'Settings',
        icon: settings,
        link: '/settings'
    },

]

export { menuItems };