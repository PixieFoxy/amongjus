import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log(user);
  return user.id ? (<Outlet />) : (<Navigate to="/login" replace />);
};

export default ProtectedRoute;
