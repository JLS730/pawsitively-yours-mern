import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
    }, [])

    return (
        <div>Success</div>
    )
}

export default Success