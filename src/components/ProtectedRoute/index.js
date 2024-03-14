import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const token = Cookies.get("cookie");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};
export default ProtectedRoute;