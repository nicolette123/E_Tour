'use client' 
import '@/styles/login.scss';
import Link from 'next/link';


const AgentLogin = () => {
    return (
       <div className="container">
            <div className="login-container">
      <h1>Login</h1>
      <h2>Login to your account</h2>
      <label htmlFor="email">E-mail Address</label><br />
      <input type="email" id="email" placeholder='Enter your email' /><br />
      <label htmlFor="password">Password</label><br />
      <input type="password" id="password" placeholder='Enter your password' /> <br />
      <div className="remember-forgot">
        <label><input type="checkbox" /> Remember me</label>
        <Link href="/reset-password">Reset Password?</Link>
      </div>
      <div className='sign-in'><Link href="/sign-in">Sign In</Link></div>
      <div className='sign-up'><h3>Don't have an account yet? <Link href="/sign-up">Sign Up today.</Link></h3></div>


            </div>
           <div className="image-container">
    <div className='transparent'></div>
    <h1><span className='highlight'>Explore</span> <br /> from your comfort Destination.</h1>
</div>
       </div> 
    );
};

export default AgentLogin;