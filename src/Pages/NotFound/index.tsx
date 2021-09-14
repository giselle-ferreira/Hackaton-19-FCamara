import { Footer } from "../Footer";
import { Header } from "../Header";
import NotFoundImg from "../../Assets/Images/notFound.svg";
import styles from "./styles.module.scss";
import { CornerDownLeft } from "react-feather";
import { useHistory } from "react-router";
export const NotFound = () => {
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };
  return (
    <>
      <Header />
      <div className={styles.notFoundContainer}>
        <img
          src={NotFoundImg}
          alt="Imagem contendo uma mensagem de erro 404 e com o texto Página não encontrada"
        />
        <button onClick={handleBack}>
          <CornerDownLeft
            width={24}
            color={"#C4C4C4"}
            className={styles.backIcon}
          />{" "}
          voltar
        </button>
      </div>
      <Footer />
    </>
  );
};
