import useAuth from "../utils/useAuth";
import { Navigate } from "react-router-dom";
import { useUserInfo } from "../utils/useUserInfo";
import Spinner from "./spinner/Spinner";

export const DevPrivateRoute = ({ children }) => {
  const isLogged = useAuth();
  const currUser = useUserInfo()

  if(currUser && currUser?.account_type == "Client"){
    return <Navigate to="/user/dashboard" />
  }

  return isLogged === null ? ( 
    <Spinner />
  ) : isLogged ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
