import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DisplayGoalDashboard from "../components/DisplayGoalDashboard";
import DisplayProfileDashboard from "../components/DisplayProfileDashboard";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-evenly gap-8">
      <div className="w-fit flex gap-16 pt-8">
        <button
          onClick={signOut}
          className="p-8 rounded-lg bg-ash-gray-500 hover:bg-ash-gray-800 hover:text-white text-2xl font-roboto-mono font-bold tracking-widest"
        >
          LOGOUT
        </button>
        <button
          onClick={() => navigate("/edit-profile")}
          className="p-8 rounded-lg bg-ash-gray-500 hover:bg-ash-gray-800 hover:text-white text-2xl font-roboto-mono font-bold tracking-widest"
        >
          EDIT PROFILE
        </button>
      </div>
      <div>
        <DisplayProfileDashboard />
      </div>
      <div>
        <DisplayGoalDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
