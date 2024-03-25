import defaultAvatar from '../img/default.png'
import avatar1 from '../img/avatar-male-1.png'
import avatar2 from '../img/avatar-female-1.png'
import avatar3 from '../img/avatar.png'
import avatar4 from '../img/avatar-female-2.png'

const availableAvatars = [
    {
        id: 0,
        image: defaultAvatar,
        alt: 'Default',
        link: 'https://i.ibb.co/4d12H4x/no-avatar.png'

    },
    {
        id: 1,
        image: avatar1,
        alt: 'Male',
        link: 'https://i.ibb.co/XjCYqKt/avatar.png'
    },
    {
        id: 2,
        image: avatar2,
        alt: 'Female',
        link: 'https://i.ibb.co/5R27sKQ/avatar-female-1.png'

    },
    {
        id: 3,
        image: avatar3,
        alt: 'Male',
        link: 'https://i.ibb.co/thPPXsK/avatar-male-1.png'


    },
    {
        id: 4,
        image: avatar4,
        alt: 'Female',
        link: 'https://i.ibb.co/H2MVDm4/avatar-female-2.png'


    },
]

export { availableAvatars };