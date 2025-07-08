import UserLogin from '@/app/auth/login/UserLogin';
import AgentLogin from '@/app/auth/login/AgentLogin';
import ForgetPassword from './auth/password/ForgetPassword';
function Page() {
    return (
        <div>
            <ForgetPassword />
            <AgentLogin />
            <UserLogin />
            
            
        </div>
    );
}
export default Page; 