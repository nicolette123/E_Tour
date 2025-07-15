import React from 'react';
import Link from 'next/link';
import "@/styles/register.css";
const UserRegister = () => {
    return (
        <div className="register-container">
          <div className='register-image'>
            <div className='transparent'></div>
            <h1>Echoes of Rwanda</h1>
            </div> 
            <div className='register-form'>
                <h1>Register your account</h1>
            <div className='same-row'>
               <div className='name-inputs'>
                <label htmlFor="first-name">First Name</label> <br />
                <input type="text" id="first-name" placeholder='Enter your first name' /></div>
                <div className='name-inputs'> 
                <label htmlFor="last-name">Last Name</label><br />
                <input type="text" id="last-name" placeholder='Enter your last name' /></div>
                </div>
               <div className='same-row'>
               <div className='name-inputs'>
                <label htmlFor="email">E-mail Address</label> <br />
                <input type="email" id="email" placeholder='Enter your email' /></div>
                <div className='name-inputs'> 
                <label htmlFor="password">Password</label><br />
                <input type="password" id="password" placeholder='Enter your password' /></div>
                </div>
                    <label htmlFor="confirm-password">Confirm Password</label><br />
                    <input type="password" id="confirm-password" placeholder='Confirm your password' /><br />
                <div className='checkboxes'>
                     <label> <input type="checkbox" /> Yes, I want to receive notifications.</label>
                 <label><input type="checkbox" /> I agree to all the Terms,Privacy Policy</label>
                 </div> <div className='create-account'>
                 <Link href="/user-login"> Create Account</Link></div>
                 <div className='login'><h3>Already have an Account?<Link href="/user-login">Login</Link></h3></div>
            </div>
        </div>
    )
}

export default UserRegister
