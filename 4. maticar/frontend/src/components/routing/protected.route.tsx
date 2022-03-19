import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil"
import { isLoggedInSelector } from "../../state/auth/auth.atom"

const Protection: React.FC = () => {
    const navigate = useNavigate()
    const isLoggedIn = useRecoilValueLoadable(isLoggedInSelector)
    useEffect(() => {
        switch (isLoggedIn.state) {
            case "hasValue":
                if (isLoggedIn.contents === false) {
                    navigate('/')
                }
        }
    }, [isLoggedIn])
    return <Outlet />
}

export default Protection