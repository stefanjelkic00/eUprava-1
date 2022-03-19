import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import { tokenAtom } from '../../state/auth/auth.atom'

const LogoutHandler = () => {
    const reset = useResetRecoilState(tokenAtom)
    const navigate = useNavigate()
    useEffect(() => {
        reset()
        navigate('/')
    }, [])
    return (
        <></>
    )
}

export default LogoutHandler