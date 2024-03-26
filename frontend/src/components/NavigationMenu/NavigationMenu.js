import React, { useEffect } from 'react';
import styled from 'styled-components';
import { menuItems } from '../../utils/menuItems';
import { signout } from '../../utils/icons';
import { useSearchParams } from 'react-router-dom';


export default function NavigationMenu({ active, setActive, showAlert, setShowAlert }) {

  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    setActive(query.get("tab") || 'Dashboard')
  }, [query, setActive])

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
            <span>{item.title}</span>
          </li>
        })}
      </ul>
      <div className="sign-out" onClick={() => setShowAlert(!showAlert)}>
        <li><span className='menu-icon'>{signout}</span> Sign Out</li>
      </div>
    </NavStyled>
  )
}

const NavStyled = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 22.5%;
  justify-content: space-between;
  background: rgba(1, 2, 1, 0.9);
  backdrop-filter: blur(4.5px);
  box-shadow: rgba(1, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  
  .menu-icon {
    display: flex;
    align-items: center;
    transition: all .3s ease-in-out;
  }

  .menu {
    display: flex;
    flex-direction: column;   
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
`;

