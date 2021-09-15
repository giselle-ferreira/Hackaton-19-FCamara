import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import WomanAndACalendar from "../../Assets/Images/womanAndACalendar.svg";
import { Link } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import Loading from "../../components/Loading";
import { EmailRegexTeste } from "../../utils/emailRegexTeste";
import { Button } from "../../components/Button";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (
        password.length > 3 &&
        password === checkPassword &&
        EmailRegexTeste(email)
      ) {
        await api.post(`users`, {
          name,
          email,
          password,
        });
        toast.success("Cadastro realizado com sucesso!");

        setTimeout(() => history.push("/"), 2000);
      } else {
        throw new Error();
      }
    } catch {
      return toast.error("Preencha os dados corretamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <aside>
          <div className={styles.descriptionArea}>
            <h2>Feito pra você!</h2>
            <p>
              O FCalendar ajuda você a programar sua rotina de trabalho de forma
              rápida e prática.
            </p>
          </div>
          <img
            className={styles.womanAndACalendar}
            src={WomanAndACalendar}
            alt={"Uma mulher e um calendário"}
          />
        </aside>
        <main>
          <div className={styles.mainContent}>
            <form className={styles.form} onSubmit={handleSignUp}>
              <h2>Cadastro</h2>
              <Input
                id={"name"}
                type={"name"}
                setValue={setName}
                value={name}
                placeholder={"Nome"}
                aria-label={"Nome"}
                required
              />
              <Input
                id={"email"}
                type={"email"}
                setValue={setEmail}
                value={email}
                placeholder={"Email"}
                aria-label={"Email"}
                required
              />
              <Input
                id={"password"}
                type={"password"}
                setValue={setPassword}
                value={password}
                placeholder={"Senha"}
                aria-label={"Senha"}
                required
              />
              <Input
                id={"checkPassword"}
                type={"password"}
                setValue={setCheckPassword}
                value={checkPassword}
                password={password}
                placeholder={"Repita a senha"}
                aria-label={"Repita a senha"}
                required
              />
              <div className={styles.registerOrLoginArea}>
                {!loading ? (
                  <Button>Cadastre-se</Button>
                ) : (
                  <Button disabledClass={styles.disabledButton} disabled>
                    <Loading />
                  </Button>
                )}
                <p>
                  Já tem uma conta? <br />
                  <Link to={"/"}>Faça Login</Link>
                </p>
              </div>
              <br />
            </form>
            <div className={styles.joinUsArea}>
              <h2>Junte-se Agora!</h2>
              <ul>
                <li>✓ Agende sua ida ao escritório de forma segura</li>
                <li>
                  ✓ Escolha sua estação de trabalho com respeito ao
                  distanciamento social
                </li>
                <li>✓ Acompanhe seus agendamentos atuais e passados</li>
              </ul>
            </div>

            <img
              className={styles.womanAndACalendarMobile}
              src={WomanAndACalendar}
              alt={"Uma mulher e um calendário"}
            />
          </div>
        </main>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
