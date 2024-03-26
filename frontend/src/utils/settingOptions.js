import { budgetIcon, displayNameIcon, passwordIcon, displayPictureIcon, displayCurrencyIcon, resetAccountIcon } from './icons';

const settingsOptions = [
    {
        id: 'budget',
        title: 'Budgets',
        icon: budgetIcon,
    },
    {
        id: 'username',
        title: 'Change display name',
        icon: displayNameIcon,
    },
    {
        id: 'password',
        title: 'Reset password',
        icon: passwordIcon,
    },
    {
        id: 'avatar',
        title: 'Change display picture',
        icon: displayPictureIcon,
    },
    {
        id: 'currency',
        title: 'Switch currency',
        icon: displayCurrencyIcon,
    },
    {
        id: 'reset',
        title: 'Reset account',
        icon: resetAccountIcon,
    },
]

export { settingsOptions };