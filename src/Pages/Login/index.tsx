import { FormEvent, useState } from "react";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const response = await api.get(`consultores/?email=${email}`);
    console.log(response);
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
            placeholder={'Insira o seu email'}
            required
          />
          <Input
            id={"password"}
            label={"Senha"}
            type={"password"}
            setValue={setPassword}
            value={password}
            placeholder={'Insira a sua senha'}
            required
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};
