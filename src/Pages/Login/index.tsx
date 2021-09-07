import { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { UserContext } from "../../Context/UserContext";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(`sessions`, { email, password });
      const userData = response.data.user;
      
      userContext?.storeData({ name: userData.name, email: userData.email });
    } catch {
      toast.error("Senha ou email inválidos!");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <h1>Login</h1>
        </header>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input
            id={"email"}
            label={"Email"}
            type={"email"}
            setValue={setEmail}
            value={email}
            placeholder={"Insira o seu email"}
            required
          />
          {userContext?.data.name}
          <Input
            id={"password"}
            label={"Senha"}
            type={"password"}
            setValue={setPassword}
            value={password}
            placeholder={"Insira a sua senha"}
            required
          />

          <button type="submit">Entrar</button>

          <Link to="/signUp">Cadastre-se</Link>
        </form>
      </div>
    </div>
  );
};
