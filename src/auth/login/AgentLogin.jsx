'use client' 
import '@/styles/login.css';
import Link from 'next/link';


const AgentLogin = () => {
    return (
       <div className="container">
              <div className="image-container">
    <div className='transparent'></div>
    <h1>Echoes of Rwanda</h1>
</div>
            <div className="login-container">
      <h1>Login</h1>
      <h2>Login to your account</h2>
      <label htmlFor="email">E-mail Address</label><br />
      <input type="email" id="email" placeholder='Enter your email' /><br />
      <label htmlFor="password">Password</label><br />
      <input type="password" id="password" placeholder='Enter your password' /> <br />
      <div className="remember-forgot">
        <label><input type="checkbox" /> Remember me</label>
        <Link href="/Agent-forget-password">Forget Password?</Link>
      </div>
      <div className='sign-in'><Link href="/sign-in">Sign In</Link></div>
      <div className='sign-up'><h3>Don't have an account yet? <Link href="/agent-register">Sign Up today.</Link></h3></div>


            </div>
     
       </div> 
    );
};

export default AgentLogin;