import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
export const LogoutButton = () => {
 const { logout } = useAuth();
 const navigate = useNavigate();

 const handleLogout = () => {
 logout();
 navigate("/login");
 };

 return (
 <button
 onClick={handleLogout}
 style={{
 padding: "10px",
 background: "red",
 color: "white",
 border: "none",
 borderRadius: "6px",
 cursor: "pointer",
 }}
 >
 Logout
 </button>
 );
};