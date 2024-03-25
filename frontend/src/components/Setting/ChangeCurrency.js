import React, { useState } from 'react'
import { ButtonStyled, DivStyled } from '../Form/FormComponentsStyled';
import { availableCurrencies } from '../../utils/currencies';
import styled from 'styled-components';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function ChangeCurrency() {

    const { currency, currentUserId } = useGlobalContext()

    const navigate = useNavigate();

    // Handle Submit Click
    const [buttonClicked, setButtonClicked] = useState(false)

    // Set active avatar
    const [active, setActive] = useState('')


    const handleSubmit = async (e) => {
        // Check if an avatar is selected
        if (active === '') {
            toast.error("Please choose a currency");
            return;
        }

        const selectedCurrency = availableCurrencies.find((item) => item.id === active)

        // Check if same currency is selected again
        if (selectedCurrency.sign === currency) {
            toast.error("Currency already active. Choose a different one.")
            return;
        }


        const baseCurrency = availableCurrencies.find((item) => item.sign === currency)

        const currencyPayload = {
            base: baseCurrency.sign,
            symbol: selectedCurrency.sign
        }

        toast.loading('Switching currency...')
        const response = await axios.put(`/update-currency/${currentUserId}`, currencyPayload)

        if (response.data.error) {
            toast.dismiss()
            toast.error(response.data.error);
            return;
        }

        toast.dismiss()
        toast.success(response.data.message);
        setButtonClicked(true);
        navigate('/login');

        setTimeout(() => {
            setButtonClicked(false);
        }, 2500);
    }

    return (
        <ChangeCurrencyStyled>
            <h5>Select Currency</h5>
            <DivStyled>
                <br />
                <div className='currency-container'>
                    {availableCurrencies.slice(0, 2).map((item) => {
                        return <div key={item.id} className='currency-item'>
                            <span
                                className={active === item.id ? 'activeCurrency currencies' : 'currencies'}
                                onClick={() => { setActive(item.id) }}
                            >{item.sign}</span>
                            <span>{item.title} {item.symbol}</span>
                        </div>
                    })}
                </div>
                <br />
                <ButtonStyled disabled={buttonClicked} onClick={() => handleSubmit()}>Confirm</ButtonStyled>

            </DivStyled>
        </ChangeCurrencyStyled>
    )
}

const ChangeCurrencyStyled = styled.div`
    padding: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    h5 {
        padding-bottom: 1rem;
    }

    .currency-container {
        display: flex;
        gap: 1rem;
        justify-content: space-evenly;

        .currency-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            .currencies {
                transition: all .2s ease-in-out;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                border-radius: 50%;
                font-size: 22px;
                font-weight: 600;
                height: 70px;
                width: 70px;
                
                &:hover {
                    opacity: 0.7;
                }
        
            }
            .activeCurrency {
                background-color: #CFC5DB;
            
            }

        }
    }
    
`

export default ChangeCurrency