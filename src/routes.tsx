import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { SignUp } from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Scheduling } from "./Pages/Scheduling";
import { NotFound } from "./Pages/NotFound";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { ResetPassword } from "./Pages/ResetPassword";
export const Routes = () => {
 

  return (
    <BrowserRouter>
      {/* {!tokenCheck() &&
      window.location.pathname !== "/signUp" &&
      window.location.pathname !== "/forgetPassword" &&
      window.location.pathname !== "/resetPassword/*" ? (
        <Redirect to="/" />
      ) : window.location.pathname === "/" ? (
        <Redirect to="/home" />
      ) : null} */}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/scheduling" component={Scheduling} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/resetPassword/:token" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
