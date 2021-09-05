import { InputHTMLAttributes, useState } from "react";
import styles from "./styles.module.scss";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  setValue: (value: string) => void;
}

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido!",
  },
};
export const Input = ({ label, id, setValue, value, ...props }: InputProps) => {
  const [error, setError] = useState("");

  const validate = () => {
    if (value.length === 0) {
      setError("Preencha um valor");
      return;
    } else if (id === "email" && !types["email"].regex.test(value)) {
      setError(types["email"].message);
      return false;
    }

    setError("");
  };
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
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
