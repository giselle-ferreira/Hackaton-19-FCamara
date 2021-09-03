import { FormEvent, useState } from "react";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const response = await api.get(`consultores/?email=${email}`);
    console.log(response);
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <Input
          id={"email"}
          label={"Email: "}
          type={"email"}
          setValue={setEmail}
          value={email}
          required
        />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
