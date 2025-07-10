'use client';
import '@/styles/reset.css';
import Link from 'next/link';
import Image from 'next/image';

const ResetPassword = () => {
    return (
        <div className="main-container">
            <img src="/images/Ellipse 2.png" alt="circle" className='img1' />
                <img src="/images/Ellipse 1.png" alt="circle" className='img2' />
            <div className="overlay">

                <div className="overlay-img">
                    <div className='stars'>
                        <img src="/images/stars.png" alt="stars" />
                    </div>
                    <img src="/images/reset.png" alt="img" />
                    <h1>Revive Access,Renew<br />Security,Rediscover Control.</h1>
                    <div className='stars2'>
                        <img src="/images/stars.png" alt="stars" />
                    </div>
                </div>
                <div className='overlay-form'>

                    <div className='reset'>
                        <h1>
                            Password Recovery:Quick and Easy
                        </h1>
                        <p>
                            Regain Access to Your Account Instantly
                        </p>
                        <div className='label-input'>
                            <label htmlFor="password">New Password</label><br />
                            <input type="password" id="password" placeholder='Enter New Password' />

                            <label htmlFor="password">Confirm New Password</label><br />
                            <input type="password" id="password" placeholder='Enter Confirm Password' /></div>

                        <div className='reset-btn'>
                            <Link href="/reset-success" className='reset-btn'>Reset Password</Link>
                        </div>
                    </div>



                </div>
            </div>

        </div>
    )
}

export default ResetPassword;
