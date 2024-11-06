import React from 'react'
import Layout from '../../components/shared/layout/Layout'
import { useSelector } from 'react-redux'

const AdminHome = () => {
    const {user} = useSelector(state=>state.auth)
  return (
    <Layout>
        <div className='container'>
            <div className='d-flex flex-column' style={{marginLeft : '275px'}}>
                <h1>welcome admin <i style={{color : 'green'}}>{user?.name}</i> 
                </h1>
            </div>
        </div>
    </Layout>
  )
}

export default AdminHome