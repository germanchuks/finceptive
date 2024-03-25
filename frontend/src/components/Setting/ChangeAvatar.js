import React, { useState } from 'react'
import { ButtonStyled, DivStyled } from '../Form/FormComponentsStyled';
import Avatar from '@mui/material/Avatar';
import { availableAvatars } from '../../utils/avatars';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';

function ChangeAvatar() {

    const { currentAvatar, setCurrentAvatar, currentUserId } = useGlobalContext();

    // Handle Submit Click
    const [buttonClicked, setButtonClicked] = useState(false)

    // Set active avatar
    const [active, setActive] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        let avatar;

        // Check if an avatar is selected
        if (active === '') {
            toast.error("Please select an avatar");
            return;
        }

        // Get active avatar link.
        const selectedAvatar = availableAvatars.find((item) => item.id === active)

        // Check if same avatar is selected again
        if (selectedAvatar.link === currentAvatar) {
            toast.error("Avatar already selected. Choose a different one.")
            return;
        }

        // Check if user clicks on default avatar while no avatar is previously setup
        if (selectedAvatar.id === 0 && (currentAvatar === "")) {
            toast.error("Default avatar selected already.")
            return;
        }

        if (selectedAvatar.id === 0) {
            avatar = {
                image: ""
            }
        } else {
            avatar = {
                image: selectedAvatar.link
            }
        }

        setButtonClicked(true);

        const updateAvatar = await axios.put(`/update-avatar/${currentUserId}`, { ...avatar });
        if (updateAvatar.data.error) {
            toast.error("Cannot complete request at this moment. Try again later");
            return;
        }

        setCurrentAvatar(updateAvatar.data.image);

        toast.success("Avatar updated successfully!")

        setActive('');

        setTimeout(() => {
            setButtonClicked(false);
        }, 2500);
    }

    return (
        <ChangeAvatarStyled
            onSubmit={handleSubmit}
        >
            <h5>Select Avatar</h5>
            <DivStyled>
                <br />
                <div className='avatar-container'>
                    {availableAvatars.map((item) => {
                        return <div key={item.id}
                            onClick={() => {
                                setActive(item.id)
                            }}
                            className={active === item.id ? 'activeAvatar avatars' : 'avatars'}>
                            <Avatar
                                alt={item.alt}
                                src={item.link}
                                sx={{ width: 56, height: 56 }}
                            />
                        </div>
                    })}
                </div>
                <br />
                <ButtonStyled disabled={buttonClicked} >Confirm</ButtonStyled>

            </DivStyled>
        </ChangeAvatarStyled >
    )
}

const ChangeAvatarStyled = styled.form`
    padding: 1.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    h5 {
        padding-bottom: 1rem;
    }
    
    .avatar-container {
        display: flex;
        gap: 1rem;
        justify-content: space-evenly;
        padding-block: 1rem;
        box-sizing: border-box;
    }
    .avatars {
        transition: all .2s ease-out;
        border-radius: 50%;
        padding: 0.5rem;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }

    }
    .activeAvatar {
        border: 1px solid black;
        background-color: #CFC5DB;


    }
`

export default ChangeAvatar