import { FormEvent, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import { Input } from "../../components/Input";
import { UserContext } from "../../Context/UserContext";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import FCalendarLogo from "../../Assets/Images/logoFCalendar.svg";
import Loading from "../../components/Loading";
import { EmailRegexTeste } from "../../services/emailRegexTeste";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const userContext = useContext(UserContext);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (EmailRegexTeste(email)) {
        const response = await api.post(`sessions`, { email, password });
        const userData = response.data.user;
        const token = response.data.token;

        userContext?.storeData({
          name: userData.name,
          email: userData.email,
          id: userData.id,
        });
        window.localStorage.setItem("fcalendartoken", token);

        history.push("/home");
      } else {
        return toast.error("Digite um email válido para prosseguir!");
      }
    } catch {
      toast.error("Senha ou email inválidos!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <aside>
          <img
            src={FCalendarLogo}
            alt="logo FCalendar"
            className={styles.logo}
          />
          <h2>Programe e organize sua rotina de trabalho em poucos cliques!</h2>
          <button
            className={styles.responsiveLoginButton}
            onClick={() => (window.location.href = `#form`)}
          >
            Login
          </button>
        </aside>
        <main>
          <div className={styles.mainContent}>
            <form id="form" className={styles.form} onSubmit={handleLogin}>
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
                {!loading ? (
                  <button type="submit">Entrar</button>
                ) : (
                  <button className={styles.disabledButton} disabled>
                    <Loading />
                  </button>
                )}
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
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
