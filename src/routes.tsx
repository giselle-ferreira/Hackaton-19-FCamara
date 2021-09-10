import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { SignUp } from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Scheduling } from "./Pages/Scheduling";
import { Header } from "./Pages/Header";


export const Routes = () => {
  const tokenCheck = () => 
  {
    const token = window.localStorage.getItem("fcalendartoken");

    if(token) {
      return token;
    }
    else
    {
      return false;
    }
  }

  return (
    <BrowserRouter>
      {!tokenCheck() && window.location.pathname !== '/signUp' ?  (
        <Redirect to="/" />
      ) : window.location.pathname === "/" ? (
        <Redirect to="/home" />
      ) : null}
      <Route path="/" exact component={Login} />
      {window.location.pathname !== "/" ? <Header /> : null}
      <Route path="/home" component={Home} />
      <Route path="/scheduling" component={Scheduling} />
      <Route path="/signUp" component={SignUp} />
    </BrowserRouter>
  );
};
