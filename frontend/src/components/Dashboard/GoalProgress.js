import React from 'react'
import styled from 'styled-components'
import GoalItem from '../Goal/GoalItem';
import { useGlobalContext } from '../../context/GlobalContext';
import ProgressBar from "@ramonak/react-progress-bar";

function GoalProgress() {

    const { userGoals } = useGlobalContext();

    const [...goalHistory] = userGoals();

    return (
        <GoalProgressStyled>
            <h3>Goal progress</h3>
            {!goalHistory.length &&
                <div className="empty-goal">
                    <span>Create a new goal</span>
                </div>
                ||

                goalHistory.slice(0, 3).map((transaction) => {
                    const { _id, title, targetAmount, currentAmount } = transaction
                    return (
                        <div className="bar-container" key={_id}>
                            <h4>{title}</h4>
                            <ProgressBar
                                completed={((currentAmount / targetAmount) * 100).toFixed(0)}
                                maxCompleted={100}
                                labelAlignment='center'
                                bgColor='#3B66FF'
                                height='35px'
                                className='progress-bar'
                                labelColor='#080E24'
                                baseBgColor='#DEE5FF'
                                borderRadius='15px'
                                animateOnRender={true}
                            />

                        </div>
                    )
                })
            }
        </GoalProgressStyled>
    )
}

const GoalProgressStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .empty-goal {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.5;
        width: 100%;
        flex: 1;
    }
    .bar-container {
        display: flex;
        gap: 1.5rem;
        align-items: center;

        .progress-bar {
            width: 100%;
        }
    }
`;

export default GoalProgress