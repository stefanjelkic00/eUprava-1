import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { hasRoleSelector, Role } from '../../state/auth/auth.atom'
import { useRecoilValueLoadableOrDefault } from '../../state/hooks.recoil'


const RolesProtection: React.FC<{ role: Role }> = ({ role }) => {
    const hasRole = useRecoilValueLoadableOrDefault(hasRoleSelector(role), true)
    const navigate = useNavigate()

    useEffect(() => {
        if (!hasRole) {
            navigate("/")
        }
    }, [hasRole])

    return (
        <Outlet />
    )
}

export default RolesProtection