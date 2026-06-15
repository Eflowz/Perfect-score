import { LogoutButton } from "../auth/Logout";
import { useAuth } from "../../context/useAuth";
const DashBoard = () => {
    const {user}=useAuth()
    return ( <div className="pt-30">
        <p>{user?.name}</p>
    <LogoutButton />
    </div> );
}
 
export default DashBoard;