import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar-male-1.png'
import logo from '../../img/logo.png'

export default function Header() {
  return (
    <HeaderStyled>
        <div className="user-container">
          <img src={logo} alt="Logo" />
          <div className="user-details">
            <div className="username">Daniel</div>
            <img src={avatar} alt="Avatar" />
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
    }
    img {
      width: auto;
      height: 50px;
    }
  }
  
`;