import React from 'react'
import styled from 'styled-components'
import logo from '../../img/logo.png'
import { useGlobalContext } from '../../context/GlobalContext'
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

export default function Header() {

  const { currentUserName, currentAvatar } = useGlobalContext();

  return (
    <HeaderStyled>
      <div className="user-container">
        <img src={logo} alt="Logo" />
        <div className="user-details">
          <div className="username">{currentUserName}</div>
          {
            (currentAvatar === '' &&
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{currentUserName[0].toUpperCase()}</Avatar>
            )
            ||
            <Avatar src={currentAvatar} sx={{ width: 35, height: 35, bgcolor: '#FFF' }} alt='Avatar' />
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
  height: 80px;
  width: 100%;
  background: rgba(1, 2, 1, 0.9);
  .user-container {
    display: flex;
    width: 1280px;
    justify-content: space-between;
    padding: 0 1.5rem 0 2.5rem;

    .user-details {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      .username {
        text-transform: capitalize;
      }
    }
    img {
      width: auto;
      height: 50px;
    }
  }
  
`;
