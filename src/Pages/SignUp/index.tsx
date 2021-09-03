import { FormEvent, useState } from "react";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import styles from "./styles.module.css";
export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const request = await api.post(`consultores`, {
      name,
      email,
    });
    console.log(request);
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <Input
          id={"name"}
          label={"Nome: "}
          value={name}
          setValue={setName}
          required
        />
        <Input
          id={"email"}
          type={"email"}
          label={"Email: "}
          value={email}
          setValue={setEmail}
          required
        />
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};
