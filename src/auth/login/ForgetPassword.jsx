'use client';
import "@/styles/forget.css";
import Link from 'next/link';
import Image from 'next/image';

const ForgetPassword = () => {
    return (
        <div className="main-container">

            <img src="/images/Ellipse 2.png" alt="circle" className='img1' />
            <img src="/images/Ellipse 1.png" alt="circle" className='img2' />

            <div className="overlay">

                <div className="overlay-img forget-overlay-img">
                    <div className='stars'>
                        <img src="/images/stars.png" alt="stars" />
                    </div>
                    <img className="human" src="/images/human.png" alt="img" />
                    <h1>Empower Your Mind,<br />Anytime,Anywhere.</h1>
                    <div className='stars2'>
                        <img src="/images/stars.png" alt="stars" />
                    </div>
                </div>
                <div className='overlay-form'>
                    <div className='login'>
                        <Link href="/">Login</Link></div>
                    <div className='reset'>
                        <h1>
                            Reset Your Password Now
                        </h1>
                        <p>
                            Securing Your Account with a New  Password
                        </p>
                        <label htmlFor="email">Email address</label><br />
                        <input type="email" id="email" placeholder='Email address' />
                        <br />
                        <div className='reset-btn'>
                            <Link href="/reset-password" className='reset-btn'>Reset Password</Link>
                        </div>
                    </div>



                </div>
            </div>

        </div>
    )
}

export default ForgetPassword;
