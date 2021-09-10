import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { SignUp } from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Scheduling } from "./Pages/Scheduling";
import {Header} from './Pages/Header'

export const Routes = () => {
  const token = window.localStorage.getItem("fcalendartoken");

  return (
    <BrowserRouter>
     {!token ? <Redirect to='/'/> : window.location.pathname === '/' ? <Redirect to='/home' /> : null}
      <Route path="/" exact component={Login} />
      <Header/>
      <Route path="/home" component={Home} />
      <Route path="/scheduling" component={Scheduling} />
      <Route path="/signUp" component={SignUp} />
    </BrowserRouter>
  );
};
