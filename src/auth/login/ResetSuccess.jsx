'use client';
import '@/styles/reset.css';
import Link from 'next/link';
import Image from 'next/image';

const ResetSuccess = () => {
    return (
        <div className="main-container">
             <img src="/images/Ellipse 2.png" alt="circle" className='img1' />
                <img src="/images/Ellipse 1.png" alt="circle" className='img2' />
            <div className="overlay">
               
                <div className="overlay-img">
                    <div className='stars'>
                        <img src="/images/stars.png" alt="stars" />
                    </div>
                   <img  src="/images/reset.png" alt="img" />
                   <h1>Revive Access,Renew<br />Security,Rediscover Control.</h1>
                   <div className='stars2'>
                        <img src="/images/stars.png" alt="stars" />
                    </div>
                </div>
                <div className='overlay-form'>
                    
                        <div className='reset'>
                            <div className='reset-icon'>
                                <img src="/images/okay.png" alt="okay" />
                            </div>
                            <div className='reset-text'>
                            <h1>
                            Password Changed!
                           </h1>
                           <h2>
                            You can now log in with your account.  
                           </h2>
                           </div>
                
                        </div>
                        
                        
               
                </div>
            </div>
           
        </div>
    )
}

export default ResetSuccess;
