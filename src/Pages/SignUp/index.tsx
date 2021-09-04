import { FormEvent, useState } from "react";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const request = await api.post(`consultores`, {
      name,
      email,
    });
    console.log(request);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <h1>Cadastre-se para agendar.</h1>
        </header>
        <form className={styles.form} onSubmit={handleSignUp}>
          <Input
            id={"name"}
            label={"Nome"}
            value={name}
            setValue={setName}
            required
          />
          <Input
            id={"email"}
            type={"email"}
            label={"Email"}
            value={email}
            setValue={setEmail}
            required
          />
          <Input
            id={"password"}
            type={"password"}
            label={"Senha"}
            value={password}
            setValue={setPassword}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};
