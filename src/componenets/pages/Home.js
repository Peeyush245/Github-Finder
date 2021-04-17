import React, { Fragment } from 'react'
import Search from '../users/Search'
import User from '../users/User'
import Users from '../users/Users'

const Home = () => (
    <Fragment>
        <Search/>
        <Users/>
    </Fragment>
)

export default Home