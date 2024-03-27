import React, { useEffect } from 'react';
import styled from 'styled-components';
import { menuItems } from '../../utils/menuItems';
import { signout } from '../../utils/icons';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";


export default function NavigationMenu({ menuOpen, active, setActive, showAlert, setShowAlert }) {

  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    setActive(query.get("tab") || 'Dashboard')
  }, [query, setActive])

  const isLargeScreen = useMediaQuery({ minWidth: 750 });

  return (
    <NavStyled>
      <ul className="menu">
        {menuItems.map((item) => {
          return <li key={item.id}
            onClick={() => {
              setQuery({ tab: item.title })
              setActive(item.title)
            }}
            className={active === item.title ? 'activeTab' : ''}>
            <span className="menu-icon">{item.icon}</span>
            {isLargeScreen && <span>{item.title}</span>}
          </li>
        })}
      </ul>
      {
        isLargeScreen &&
        <div className="sign-out" onClick={() => setShowAlert(!showAlert)}>
          <li><span className='menu-icon'>{signout}</span> Sign Out</li>
        </div>
      }
    </NavStyled>
  )
}

const NavStyled = styled.nav`

  display: flex;
  background: rgba(1, 2, 1, 0.9);
  backdrop-filter: blur(4.5px);
  justify-content: space-between;

  .menu-icon {
    display: flex;
    align-items: center;
    transition: all .3s ease-in-out;
  }
  

  /* Large screen */
  @media (min-width: 750px) {
    width: 22.5%;
    flex-direction: column;
    height: 100%;
    box-shadow: rgba(1, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    
    .menu {
      display: flex;
      flex-direction: column;
    }
    .menu-icon {
      display: flex;
      align-items: center;
      transition: all .3s ease-in-out;
    }
    .sign-out {
      display: flex;
      align-items: center;
      width: 100%;
      background-color: rgba(36, 35, 35, 1);
    }

    li {
      display: flex;
      padding-left: 2rem;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      height: 50px;
      width: 100%;
      transition: all .3s ease-in-out;
      opacity: 0.6;
      font-size: medium;

      &:hover {
        background-color: grey;
      }
    }

    .activeTab {
      background-color: #F2F5FF;
      opacity: 1;
      font-weight: bolder;
      color: #000;
    }
  }
  
  @media (max-width: 750px) {
    width: 100%;
    position: fixed;
    height: 45px;
    bottom: 0;
    z-index: 1;
    flex-direction: row;
    padding: 0.5rem;
    opacity: 0.6;


    .menu {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      
    }

    .menu-icon {
      transition: all .3s ease-in-out;
      opacity: 1 !important;
      &:hover {
        background-color: grey;
        border-radius: 50%;

      }
    }
  
    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all .3s ease-in-out;
      opacity: 1 !important;
    }

    .activeTab {
      background-color: #F2F5FF;
      opacity: 1;
      font-weight: bolder;
      color: #000;
      padding: 0.2rem;
      border-radius: 50%;
    }
  }
  

`;

