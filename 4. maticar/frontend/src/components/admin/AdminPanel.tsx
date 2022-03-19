import React, { useEffect } from 'react'
import { getWorkers } from '../../api/api'

const AdminPanel = () => {

    useEffect(() => {
        getWorkers().then((res) => {
        console.log(res?.data)
    })
    }, [])
    return (
        <div>AdminPanel</div>
    )
}

export default AdminPanel