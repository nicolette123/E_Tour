import React from 'react'
import Link from 'next/link'
import "@/styles/user.css";
const UserType = () => {
    return (
        <div className="user-type-container">
         <div className='user-image'>
         <div className='transparent'></div>
         <h1> Echoes of Rwanda</h1>
            </div> 
            <div className='user-choice'>
                <h1>
                    <span className='highlight'>Echoes</span> of Rwanda Platform
                </h1>
                <p>Manage all activities  that concern  the exploration of nature</p>
                <div className='user-options'>
                   <div className='user-links'> <Link href="/agent-login">Agent</Link>
                    <Link href="/admin">Admin</Link></div>
                    <Link href="/user-login" className='traveller'>Traveller</Link>
                </div>
                </div>  
        </div>
    )
}

export default UserType
