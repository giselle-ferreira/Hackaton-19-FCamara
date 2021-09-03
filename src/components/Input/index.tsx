import { InputHTMLAttributes } from "react";
import styles from './styles.module.scss'; 
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  setValue: (value: string) => void;
}

export const Input = ({ label, id, setValue, value, ...props }: InputProps) => {
  return (
    <>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        {...props}
        className={styles.input}
      />
    </>
  );
};
