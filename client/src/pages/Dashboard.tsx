import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DisplayProfile from "../components/DisplayProfile";
import DisplayGoal from "../components/DisplayGoal";

const Dashboard = () => {
  const { user, logout } = useAuth();
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
          className="p-8 rounded-lg outline hover:bg-timberwolf-light"
        >
          LOGOUT
        </button>
        <button
          onClick={() => navigate("/edit-profile")}
          className="p-8 rounded-lg outline hover:bg-timberwolf-light"
        >
          EDIT PROFILE
        </button>
      </div>
      <div>
        <DisplayProfile />
      </div>
      <div>
        <DisplayGoal />
      </div>
      <div className="text-4xl animate-pulse text-center p-16">
        Dashboard of {user.email}
      </div>
    </div>
  );
};

export default Dashboard;
