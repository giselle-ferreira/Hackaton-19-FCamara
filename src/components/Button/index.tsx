import { ReactChild } from "react";
import styles from "./styles.module.scss";
type ButtonProps = {
  children: ReactChild;
  disabledClass?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button = ({ children, onClick,disabled, disabledClass }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`${styles.button} ${disabledClass ? disabledClass : ""} `}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
