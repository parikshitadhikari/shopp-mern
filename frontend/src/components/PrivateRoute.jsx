import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // if logged in then show outlet otherwise redirect to login screen
  return userInfo ? <Outlet /> : <Navigate to="/login" replace={true} />; //replace=true prevents redirecting to login screen when back button is pressed
};

export default PrivateRoute;
