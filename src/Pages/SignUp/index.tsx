import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`users`, {
        name,
        email,
        password,
      });
      toast.success("Cadastro realizado com sucesso!");

      setTimeout(() => history.push("/"), 2000);
    } catch {
      return toast.error("Preencha os dados corretamente!");
    }
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
