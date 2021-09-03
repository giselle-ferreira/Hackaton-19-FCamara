import { BrowserRouter, Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Scheduling } from "./pages/Scheduling";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/scheduling" component={Scheduling} />
      <Route path="/signUp" component={SignUp} />
    </BrowserRouter>
  );
};
