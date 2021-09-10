import { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import { Input } from "../../components/Input";
import { UserContext } from "../../Context/UserContext";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import FCalendarLogo from "../../Assets/Images/logoFCalendar.svg";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const userContext = useContext(UserContext);
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`sessions`, { email, password });
      const userData = response.data.user;
      const token = response.data.token;

      userContext?.storeData({ name: userData.name, email: userData.email, id: userData.id, jwt: token });
      window.localStorage.setItem("fcalendartoken", token);

      history.push("/home");
    } catch {
      toast.error("Senha ou email inválidos!");
    }
  };
  return (
    <div className={styles.container}>
      <aside>
        <img src={FCalendarLogo} alt="logo FCalendar" className={styles.logo} />
        <h2>Programe e organize sua rotina de trabalho em poucos cliques!</h2>
      </aside>
      <main>
        <div className={styles.mainContent}>
          <form className={styles.form} onSubmit={handleLogin}>
            <h2>Login</h2>
            <Input
              id={"email"}
              type={"email"}
              setValue={setEmail}
              value={email}
              placeholder={"email"}
              required
            />
            <Input
              id={"password"}
              type={"password"}
              setValue={setPassword}
              value={password}
              placeholder={"senha"}
              required
            />
            <div className={styles.loginButtonForgetPasswordArea}>
              <button type="submit">Entrar</button>
              <Link to="#" className={styles.forgetPassword}>
                {" "}
                esqueceu a sua senha?
              </Link>
            </div>
            <br />
            <p className={styles.firstAccessArea}>
              Primeiro Acesso? <Link to="/signUp">Cadastre-se!</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};
