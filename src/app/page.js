import UserLogin from '@/auth/login/UserLogin';
import AgentLogin from '@/auth/login/AgentLogin';
import ForgetPassword from '../auth/login/ForgetPassword';
import ResetPassword from '../auth/login/ResetPassword';
import ResetSuccess from '../auth/login/ResetSuccess';
function Page() {
    return (
        <div>
            {/* <ResetSuccess />
            <ResetPassword />
            <ForgetPassword />
            <AgentLogin /> */}
            <UserLogin />
            
            
        </div>
    );
}
export default Page; 