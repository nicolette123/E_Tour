import UserLogin from '@/auth/login/UserLogin';
import AgentLogin from '@/auth/login/AgentLogin';
import ForgetPassword from '../auth/login/ForgetPassword';
import ResetPassword from '../auth/login/ResetPassword';
import ResetSuccess from '../auth/login/ResetSuccess';
import UserType from '@/auth/login/UserType';
import SideBar from '@/components/SideBar';
import 'remixicon/fonts/remixicon.css'
import TopBar from '@/components/TopBar';
import StatsCard from '@/components/StatsCard';
import DestinationCard from '@/components/DestinationCard';
import TripTable from '@/components/TripTable';
import AdminDash from '@/components/AdminDash';
import Verification from '@/auth/login/Verification';
function Page() {
    return (
        <div>
         
            {/* <UserType/> */}
           
           
            <AdminDash />
           

        </div>
    );
}
export default Page; 