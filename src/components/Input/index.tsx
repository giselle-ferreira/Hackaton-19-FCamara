import { InputHTMLAttributes, useState } from "react";
import { EmailRegexTeste } from "../../services/emailRegexTeste";
import styles from "./styles.module.scss";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
  password?: string;
  setValue: (value: string) => void;
}

const types = {
  email: {
    message: "Preencha um email válido!",
  },
  shortPassword: {
    message: "A senha deve conter ao menos 4 dígitos",
  },
  noMatchingPasswords: { message: "As senhas são diferentes" },
};
export const Input = ({
  id,
  setValue,
  value,
  password,
  ...props
}: InputProps) => {
  const [error, setError] = useState("");

  const validate = () => {
    if (value.length === 0) {
      setError("Preencha um valor");
      return;
    } else if (id === "email" && !EmailRegexTeste(value)) {
      setError(types["email"].message);
      return false;
    } else if (id === "password" && value.length < 4) {
      setError(types["shortPassword"].message);
      return false;
    } else if (id === "checkPassword" && value !== password) {
      setError(types["noMatchingPasswords"].message);
      return false;
    } else if (id === "checkPassword" && value.length < 4) {
      setError(types["shortPassword"].message);
      return false;
    }
    setError("");
  };
  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onBlur={validate}
        {...props}
        className={
          error.length > 0 ? `${styles.inputError}` : `${styles.input}`
        }
      />
      {error.length > 0 && <p className={styles.error}>{error}</p>}
    </>
  );
};
