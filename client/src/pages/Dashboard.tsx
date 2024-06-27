import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-evenly">
      <div className="w-fit">
        <button
          onClick={signOut}
          className="p-8 rounded-lg outline hover:bg-timberwolf-light"
        >
          LOGOUT
        </button>
      </div>
      <div className="text-4xl animate-pulse text-center p-24">
        Dashboard of {user.email}
      </div>
    </div>
  );
};

export default Dashboard;
