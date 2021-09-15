import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { SignUp } from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Scheduling } from "./Pages/Scheduling";
import { NotFound } from "./Pages/NotFound";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { ResetPassword } from "./Pages/ResetPassword";
import ProtectedRoute from "./Helper/ProtectedRoute";
import { checkToken } from "./utils/checkToken";
export const Routes = () => {
  return (
    <BrowserRouter>
      {/* it checks if the token exists and the url name is true and redirect to home if its true */}
      {(checkToken() && window.location.pathname === "/signUp") ||
      window.location.pathname === "/"  ? (
        <Redirect to="/home" />
      ) : null}
      <Switch>
        <Route path="/" exact component={Login} />
        <ProtectedRoute path="/home" component={Home} />
        <Route path="/scheduling" component={Scheduling} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/resetPassword/:token" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
