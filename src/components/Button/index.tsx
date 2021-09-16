import { ReactChild } from "react";
import styles from "./styles.module.scss";
type ButtonProps = {
  children: ReactChild;
  disabledClass?: string;
  disabled?: boolean;
};

export const Button = ({ children, disabled, disabledClass }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`${styles.button} ${disabledClass ? disabledClass : ""} `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
