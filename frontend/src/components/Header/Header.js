import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../img/logo.png'
import { useGlobalContext } from '../../context/GlobalContext'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useMediaQuery } from "react-responsive";
import { exitIcon, moreIcon } from '../../utils/icons';

export default function Header({ showAlert, setShowAlert }) {

  const { currentUserName, currentAvatar } = useGlobalContext();

  const isMobile = useMediaQuery({ maxWidth: 750 });
  const [logoutMenu, setLogoutMenu] = useState(false)

  return (
    <HeaderStyled>
      <div className="user-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <div className="user-details">
          <div className="username">{currentUserName}</div>
          {
            (currentAvatar === '' &&
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{currentUserName[0].toUpperCase()}</Avatar>
            )
            ||
            <Avatar src={currentAvatar} sx={{ width: 35, height: 35, bgcolor: '#FFF' }} alt='Avatar' />
          }

          {
            isMobile &&
            <div className="more-icon" onClick={() => setLogoutMenu(!logoutMenu)}>
              {moreIcon}
            </div>
          }
          {
            logoutMenu &&
            <div className="sign-out" onClick={() => setShowAlert(!showAlert)}>
              <li><span className='menu-icon'>{exitIcon}</span></li>
            </div>
          }
        </div>
      </div>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;  
  justify-content: center;
  position: relative;
  height: 10%;
  width: 100%;
  background: rgba(1, 2, 1, 0.9);

  /* Large Screen */
  @media (min-width: 750px) {
    .user-container {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem 0 2.5rem;

      .logo-container {
        display: flex;
        align-items: center;
        height: 100%;
        width: 50%;
        
        img {
          height: 70%;
          width: fit-content;
        }
      }

      .user-details {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        .username {
          text-transform: capitalize;
        }
        img {
          border-radius: 50%;
        }
      }
    }
  }

  /* Small Screen */
  @media (max-width: 750px) {
    opacity: 0.9;
    height: 6%;

    .user-container {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      padding-inline: 0.5rem;

      .logo-container {
        display: flex;
        align-items: center;
        height: 100%;
        width: 25%;
        
        img {
          height: 50%;
          width: fit-content;
        }
      }
      
      .user-details {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        
        .username {
          text-transform: capitalize;
          font-size: 90%;
        }

        img {
          border-radius: 50%;
        }
        
        .sign-out {
          display: absolute;
          top: 10%;
          left: 0;
          }
      }
    }
  }

  
`;
