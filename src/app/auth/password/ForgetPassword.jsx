'use client';
import '@/styles/password.scss';
import Link from 'next/link';
import Image from 'next/image';

const ForgetPassword = () => {
    return (
        <div className="main-container">
            <div className="overlay">
                <div className="overlay-img">
                    {/* <img src="/images/Rectangle.png" alt="stars" /> */}
                   <img src="/images/human.png" alt="img" />
                   <h1>Empower Your Mind,<br />Anytime,Anywhere.</h1>
                </div>
                <div className='overlay-form'>
                    <div className='login'>
                        <Link href="/auth/login/UserLogin">Login</Link></div>
                        <div className='reset'>
                            <h1>
                            Reset Your Password Now
                           </h1>
                        </div>
                        
                        
               
                </div>
            </div>
           
        </div>
    )
}

export default ForgetPassword
