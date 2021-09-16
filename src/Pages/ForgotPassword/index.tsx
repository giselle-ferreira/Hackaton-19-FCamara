import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import Loading from "../../components/Loading";
import styles from "./styles.module.scss";

import FCalendarLogo from "../../Assets/Images/logoFCalendar.svg";
import { Input } from "../../components/Input";
import { FormEvent, useState } from "react";
import { EmailRegexTeste } from "../../utils/emailRegexTeste";
import { api } from "../../services/api";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useHistory } from "react-router-dom";

export const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (EmailRegexTeste(email)) {
        await api.post("users/forgotpassword", {
          email,
        });
        toast.success("Link para alteração de senha enviado para o email!");

        setTimeout(() => history.push("/"), 2000);
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Insinar um e-mail válido");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header disabledClass={styles.headerDisabled} />
      <div className={styles.container}>
        <aside>
          <img
            src={FCalendarLogo}
            alt="logo FCalendar"
            className={styles.logo}
          />
          <h2>Programe e organize sua rotina de trabalho em poucos cliques!</h2>
        </aside>
        <main>
          <div className={styles.mainContent}>
            <form
              id="form"
              className={styles.form}
              onSubmit={handleForgotPassword}
            >
              <h2>esqueceu a senha?</h2>
              <p className={styles.description}>
                Insira seu email para receber instruções!
              </p>
              <Input
                id={"email"}
                type={"email"}
                setValue={setEmail}
                value={email}
                placeholder={"email"}
                required
              />

              {!loading ? (
                <Button>Recuperar</Button>
              ) : (
                <Button disabledClass={styles.disabledButton} disabled>
                  <Loading />
                </Button>
              )}
              <Link to="/"> Faça login</Link>

              <Link to="/signUp">Cadastre-se!</Link>
            </form>
          </div>
        </main>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <Footer />
    </>
  );
};
