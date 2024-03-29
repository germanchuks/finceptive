import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
import cover1 from '../img/cover-1.jpg';
import transactions from '../img/transactions-2.jpg'
import goals from '../img/goals-2.jpg';
import budget from '../img/budget-2.jpg';
import { FaSquareGithub } from "react-icons/fa6";
// import { FaLinkedin } from "react-icons/fa";


function Home() {
    return (
        <HomeStyled>
            <div className="container">
                <div className="first-view">
                    <header>
                        <div className="logo-header">
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className="links-header">
                            <span className='sign-in'><Link style={linkHeader} to="/login">Sign in</Link></span>
                            <span className='register'><Link style={linkHeader} to="/register">Create Account</Link></span>
                        </div>
                    </header>
                    <section className="welcome-section">
                        <div className="description">
                            <h1> Your Financial Compass</h1>
                            <span>Simplify your finances. Finceptive is your easy-to-use financial companion, guiding you on your path to financial wellness.</span>
                        </div>
                        <div className="cover-image">
                            <img src={cover1} alt="Cover" />
                        </div>
                    </section>
                </div>
                <div className="second-view">
                    <section className="services-container">
                        <section className="services">
                            <div className="service-card">
                                <div className="service-image">
                                    <img src={transactions} alt="Transactions" />
                                </div>
                                <span className='service-title'>Effortlessly track your daily transactions and stay on top of your finances.</span>
                            </div>
                            <div className="service-card">
                                <div className="service-image">
                                    <img src={goals} alt="Goals" />
                                </div>
                                <span className='service-title'>Set clear financial goals and watch your progress with ease.</span>
                            </div>
                            <div className="service-card">
                                <div className="service-image">
                                    <img src={budget} alt="Budget" />
                                </div>
                                <span className='service-title'>Create spending limits for various daily expenses.</span>
                            </div>
                        </section>
                    </section>
                    <footer>
                        <section className="links-footer">
                            <div className="logo-footer">
                                <img src={logo} alt="Logo" />
                            </div>
                            <div className="links-right">
                                <div className="useful-links">
                                    <h6>Useful Links</h6>
                                    <span className='link'><Link style={linkFooter} to='https://github.com/germanchuks/finceptive' target="_blank" rel="noopener noreferrer">Github Repository</Link></span>
                                </div>
                                <div className="contacts-container">
                                    <h6>Contact</h6>
                                    <div className="contact-links">
                                        <span className="link"><Link style={linkFooter} to='https://github.com/stuckwithprogression' target="_blank" rel="noopener noreferrer"><FaSquareGithub /> stuckwithprogression</Link></span>
                                        <span className="link">
                                            <Link style={linkFooter} to='https://github.com/germanchuks' target="_blank" rel="noopener noreferrer"><FaSquareGithub /> germanchuks</Link>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </section>
                        <div className="copyright-footer">
                            <small>Copyright &copy; 2024</small>
                        </div>
                    </footer>
                </div>
            </div>
        </HomeStyled>

    )

}

const HomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    transition: all ease-in 1s;
    
    
    .container {
        display: flex;
        flex-direction: column;
        height: 200vh;
        width: 100%;
        overflow-x: scroll;

        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        scrollbar-width: none;

        
    }
    .container::-webkit-scrollbar {
        display: none;
    }
    
    .first-view {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #DADAE6;
            background-color: rgba(1, 2, 1, 0.9);
            width: 100%;
            padding: 1.2rem .5rem;
            flex: .5;


            .links-header {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                font-family: sans-serif !important;


                span {
                    display: flex;
                    justify-content: center;
                    border: 1px solid #FFF;
                    color: #FFF;
                    width: 50%;
                    cursor: pointer;
                    transition: all .5s ease-out;
                    
                    &:hover {
                        border: 1.5px solid #FFF;
                        font-weight: bolder;
                    }
                }
            }
    
        }

        .welcome-section {
            width: 100%;
            flex: 4;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .description {
                display: flex;
                flex-direction: column;
                color: #000 !important;
                height: 100%;
                justify-content: center;

                h1 {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
                    font-stretch: condensed;
                    padding-bottom: .5rem;
                }
            }


        }
    }

    .second-view {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;

        .services-container {
            width: 100%;
            flex: 5;
            display: flex;
            flex-direction: column;
            color: black;
            justify-content: center;
            align-items: center;
            padding-block: 2.5rem;
            background-color: rgba(1, 2, 1, 0.85);
            box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
            
            .services {
                display: flex;
                justify-content: space-evenly;
                gap: 2.5rem;
                padding-inline: 1.5rem;
                font-family: sans-serif !important;


                .service-card {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: #FFF !important;
                    padding: 1rem;
                    height: 100%;
                    border-radius: 20px;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

                    .service-image {
                        display: flex;
                        height: 80%;
                        width: 100%;

                        img {
                            height: 100%;
                            width: 100%;
                            object-fit: contain;
                        }
                    }

                    .service-title {
                        font-size: 75%;
                        font-family: sans-serif !important;
                        font-weight: 500;

                        height: 20%;
                        display: flex;
                        text-align: center;
                        align-items: center;
                    }
                }

            }
        }
    
        footer {
            width: 100%;
            flex: 1;
    
            .links-footer {
                background-color: rgba(1, 2, 1, 0.9);
                display: flex;
                justify-content: space-between;
                height: 120px;
                align-items: center;
                padding-inline: 1.5rem;
    
                
                .links-right {
                    display: flex;
                    gap: 2rem;
                    font-family: sans-serif !important;


                    .link {
                        font-weight: 200;
                        font-size: x-small;
                        opacity: 0.8;
                    }

                    .useful-links {
                        display: flex;
                        flex-direction: column;
                        gap: .3rem;
                    }
                    .contacts-container {
                        display: flex;
                        flex-direction: column;
                        gap: .3rem;

                        .contact-links {
                            display: flex;
                            flex-direction: column;
                            gap: .1rem;
                        }
                    }
                }
    
    
            }
            .copyright-footer {
                background-color: rgba(1, 2, 1, 0.85);
                font-family: sans-serif;
                font-weight: 300;
                font-size: x-small;
                color: #C9C2D1;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-block: 1rem;
    
            }
        }
    }


    /* Large Screen */
    @media (min-width: 700px) {
        .logo-header {
            display: flex;
            align-items: center;
            height: 50%;
            border-radius: 20px;
            
            img {
                width: 40%;
                border-radius: 20px;
                padding: .25rem;
            }
        }

        .links-header {
            width: 50%;
            gap: 3rem;
            padding-right: 2rem;

            span {
                padding-block: .7rem;
            }
        }


        .welcome-section {
            .description {
                font-size: 3.3rem;
                width: 50%;
                padding-left: 2rem;
                padding-right: 1rem;

                span {
                    font-size: 1.5rem;
                }
            }

            .cover-image {
                display: flex;
                height: 100%;
                width: 50%;                
            
                img {
                    width: 90%;
                    height: fit-content;
                }
            }
        }

        .services {

            .service-card {
                width: 30%;
            }
        }

        .logo-footer {
            display: flex;
            align-items: center;
            height: 25px;
            width: auto;
            
            img {
                height: 100%;
                width: fit-content;
            }
        }
    
    }


  /* Small Screen */
  @media (max-width: 700px) {
    .logo-header {
        display: flex;
        align-items: center;
        height: 40%;
        width: 35%;
        border-radius: 20px;
            
        img {
            height: auto;
            width: 100%;
            border-radius: 20px;
            padding: .15rem;
        }
    }
    .links-header {
        width: 65%;
        gap: .5rem;
        font-size: 40%;
        padding-left: .5rem;

        span {
            padding-block: .4rem;
        }
    }

    .welcome-section {
        flex-direction: column;

        .description {
            font-size: 1.2rem;
            padding-top: .2rem;
            width: 100%;
            height: 30%;
            padding-inline: .5rem;

            span {
                font-size: 1rem;
            }
        }

        .cover-image {
            display: flex;
            height: 70%;
            width: 100%;
            justify-content: center;
            align-items: center;
            box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
            
            img {
                width: 70%;
                height: auto;
                /* height: fit-content; */
            }
        }
    }

    .services {
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .service-card {
            width: 100%;
        }
    }

    .links-footer {
        flex-direction: column;
        justify-content: center;
        padding-block: 1rem;
        gap: 0.5rem;
    }

    .logo-footer {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 20%;
        
        img {
            height: 100%;
            width: auto;
        }
    }

  }
`

const linkHeader = { width: '100%', color: '#FFF', justifyContent: 'center', display: 'flex', textDecoration: 'none' }
const linkFooter = { width: '100%', color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.1rem', textDecoration: 'none' }

export default Home;