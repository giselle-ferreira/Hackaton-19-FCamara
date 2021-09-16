import styles from "./styles.module.scss";
import FCalendarLogo from "../../Assets/Images/logoFCalendar.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import Loading from "../../components/Loading";
import { Link, useHistory, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../services/api";
import { Header } from "../Header";

type paramsProps = {
  token: string;
};
export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const params = useParams<paramsProps>();
  useEffect(() => {
    const checkToken = async () => {
      await api
        .get("sessions", {
          headers: { Authorization: "Bearer " + params.token },
        })
        .then((response) => {
          const { email } = response.data.user;
          setEmail(email);
        });
    };
    checkToken();
  }, [params.token]);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password.length > 3 && password === checkPassword) {
        await api.put(
          `users/forgotPassword`,
          {
            email,
            password,
            confirmPassword: checkPassword,
          },
          { headers: { Authorization: "Bearer " + params.token } }
        );
        toast.success("Senha alterada com sucesso!");

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
              onSubmit={handleResetPassword}
            >
              <h2>altere a senha</h2>
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

              {!loading ? (
                <Button>Alterar</Button>
              ) : (
                <Button disabledClass={styles.disabledButton} disabled>
                  <Loading />
                </Button>
              )}
              <Link to="/"> Faça login</Link>
            </form>
          </div>
        </main>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
