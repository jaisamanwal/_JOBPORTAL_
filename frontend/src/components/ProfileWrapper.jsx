import React from 'react'
import { useSelector } from 'react-redux'
import Profile from './Profile'
import RecruiterProfile from './RecruiterProfile'

const ProfileWrapper = () => {
    const { user } = useSelector(store => store.auth);

    if (user?.role === 'recruiter') {
        return <RecruiterProfile />
    }

    return <Profile />
}

export default ProfileWrapper
