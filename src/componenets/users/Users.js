import React, { Component } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'

const Users = ({ users, loading }) => {
    // state = {
    //     users: [
    //         {
    //             id: '1',
    //             login: 'jojo',
    //             avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    //             html_url: 'https://github.com/mojombo'
    //         },
    //         {
    //             id: '2',
    //             login: 'mojombo',
    //             avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    //             html_url: 'https://github.com/mojombo'
    //         },
    //         {
    //             id: '3',
    //             login: 'gogo',
    //             avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    //             html_url: 'https://github.com/mojombo'
    //         }
    //     ]
    // }

        if(loading) {
            return <Spinner />
        } else {
            return (
                <div style={userStyle}>
                    {users.map(user => (
                        <UserItem key = {user.id}
                            user = {user}
                        />
                    ))}
                </div>
            )
        }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users
