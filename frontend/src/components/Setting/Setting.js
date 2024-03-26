import React, { useState } from 'react'
import styled from 'styled-components'
import SetDisplayName from './SetDisplayName';
import ChangePassword from './ChangePassword';
import ChangeAvatar from './ChangeAvatar';
import ResetAccount from './ResetAccount';
import ChangeCurrency from './ChangeCurrency';
import SetBudget from './SetBudget';
import { settingsOptions } from '../../utils/settingOptions';
import { useMediaQuery } from "react-responsive";


function Setting() {

  const [optionClicked, setOptionClicked] = useState('budget')

  const isMobile = useMediaQuery({ minWidth: 750 });

  const showSetup = () => {
    switch (optionClicked) {
      case 'budget':
        return <SetBudget />
      case 'username':
        return <SetDisplayName />
      case 'password':
        return <ChangePassword />
      case 'avatar':
        return <ChangeAvatar />
      case 'currency':
        return <ChangeCurrency />
      case 'reset':
        return <ResetAccount />
      default:
        return;
    }
  }

  return (
    <SettingStyled>

      <div className="options-box">
        <h4>Options</h4>
        <ul className="options">
          {settingsOptions.map((option) => {
            return <li key={option.id}
              onClick={() => {
                setOptionClicked(option.id)
              }}
              className={optionClicked === option.id ? 'activeOption' : ''}>
              <span className="option-icon">{option.icon}</span>
              {
                isMobile &&
                <span>{option.title}</span>
              }
            </li>
          })}
        </ul>
      </div>

      <div className="setup-box">
        {showSetup()}
      </div>
    </SettingStyled>
  )
}

const SettingStyled = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  height: 100%;
  padding-bottom: 3.5rem;

  .options-box {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-inline: 1rem;
    padding-top: 1rem;
    background-color: #D8D8ED;
    border-radius: 15px;

    .options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-block: 1rem;

      li {
        display: flex;
        padding-left: 2rem;
        align-items: center;
        gap: 1rem;
        font-size: medium;
        cursor: pointer;
        height: 50px;
        width: 100%;
        font-weight: 400;
        transition: all .3s ease-in-out;
        opacity: 0.6;

        &:hover {
          background-color: #F2F5FF;

        }

      }

      .option-icon {
        display: flex;
        align-items: center;
        transition: all .3s ease-in-out;
      }

      .activeOption {
        background-color: #C3C3D6;
        opacity: 1;
        font-weight: bolder;
        color: #000;
      }
    }
  }

  .setup-box {
    display: flex;
    flex: 1;
    border-radius: 20px;
    height: fit-content;

  }

  @media (max-width: 750px) {
    padding-inline: 0;
    padding-block: 0.5rem 3rem;
    gap: 1rem;

    .options-box {
      width: 15%;
      align-items: center;
      padding: 0;
      padding-top: 0.5rem;
      border-radius: 0;

      .options {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          padding: 0;
          display: flex;
          justify-content: center;
        }
      }
    }
  }

`

export default Setting