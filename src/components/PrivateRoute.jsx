import { Navigate, Outlet } from "react-router";
import {useAuthStatus} from "./hooks/useAuthStatus";

export default function PrivateRoute() {
    const {loggedin,checkingStatus} = useAuthStatus();
    if(checkingStatus){
        return <h3>Loading</h3>
    }
  return loggedin ? <Outlet/>: <Navigate to={'/sign-in'} />

}
