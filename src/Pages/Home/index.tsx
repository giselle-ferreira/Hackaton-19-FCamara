import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { api } from "../../services/api";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./styles.module.scss";

import visualizarImg from "../../Assets/Images/visualizar.svg";
import editarImg from "../../Assets/Images/editar.svg";
export const Home = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Header />
      <main>
        {/* <!-- Título Geral --> */}
        <div className={styles.titulo}>
          <h1>Pronto pra se planejar hoje?</h1>
        </div>

        {/* <!-- histórico --> */}
        <div className={styles.main}>
          <div className={styles.historico}>
            <h1>HISTÓRICO</h1>
            <div className={styles.board}>
              <table>
                {/* <!-- <div className="table-title">
               <thead>
                  <tr>
                    <th>Data</th>
                    <th>Estação de<br>Trabalho</th>
                  </tr>
                </thead> -->
              </div>  */}
                <thead>
                  <div className={styles.tableTitle}>
                    <h2>Data</h2>
                    <h2>Estação de trabalho</h2>
                  </div>
                </thead>

                <tbody>
                  <div className={styles.tableBody}>
                    <tr>
                      <td>DD/MM/YYYY</td>
                      <td>XX - Setor X</td>
                    </tr>
                    <tr>
                      <td>DD/MM/YYYY</td>
                      <td>XX - Setor X</td>
                    </tr>
                    <tr>
                      <td>DD/MM/YYYY</td>
                      <td>XX - Setor X</td>
                    </tr>
                    <tr>
                      <td>DD/MM/YYYY</td>
                      <td>XX - Setor X</td>
                    </tr>
                    <tr>
                      <td>DD/MM/YYYY</td>
                      <td>XX - Setor X</td>
                    </tr>
                  </div>
                </tbody>
              </table>
            </div>
            {/* <!-- Páginas --> */}
            <div className={styles.pages}>
              <a href="#">
                <svg
                  width="16"
                  height="7"
                  viewBox="0 0 16 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.672 0.624L2.688 3.76L4.672 6.896H2.656L0.656 3.76L2.656 0.624H4.672ZM8.16 0.624L6.176 3.76L8.16 6.896H6.144L4.144 3.76L6.144 0.624H8.16ZM15.6708 0.624L13.6867 3.76L15.6708 6.896H13.6547L11.6547 3.76L13.6547 0.624H15.6708Z"
                    fill="#B1B1B1"
                  />
                </svg>
              </a>
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">6</a>
              <a href="#">
                <svg
                  width="16"
                  height="7"
                  viewBox="0 0 16 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.656 6.896L2.64 3.76L0.656 0.624H2.672L4.672 3.76L2.672 6.896H0.656ZM11.6588 6.896L13.6427 3.76L11.6588 0.624H13.6747L15.6748 3.76L13.6747 6.896H11.6588ZM8.17075 6.896L10.1547 3.76L8.17075 0.624H10.1867L12.1867 3.76L10.1867 6.896H8.17075Z"
                    fill="#B1B1B1"
                  />
                </svg>
              </a>
            </div>
            <div className={styles.ordenar}>
              <h4>
                <img src={"/"} />
                Ordernar(Mais recentes)
              </h4>
              <h4>
                <img src={"/"} />
                Filtrar
              </h4>
            </div>
          </div>

          {/* <!-- agendamentos atuais --> */}
          <div className={styles.agendamentosAtuais}>
            <h1>AGENDAMENTOS ATUAIS</h1>
            <div className={styles.agendamento1}>
              <h2>Sexta-feira, 10/09/21</h2>
              <h3>
                <img src="/" />
                São Paulo
              </h3>
            </div>

            <div className={styles.visualEdit}>
              <h5>
                <a href="#">
                  <img src={visualizarImg} /> Visualizar
                </a>
              </h5>
              <h5>
                <a href="#">
                  <img src={visualizarImg} />
                  Editar
                </a>
              </h5>
            </div>

            <div className={styles.agendamento2}>
              <h2>Sexta-feira, 13/09/21</h2>
              <h3>
                <img src="/" />
                São Paulo
              </h3>
            </div>

            <div className={styles.visualEdit}>
              <h5>
                <a href="#">
                  <img src={visualizarImg} />
                  Visualizar
                </a>
              </h5>
              <h5>
                <a href="#">
                  <img src={editarImg} />
                  Editar
                </a>
              </h5>
            </div>
          </div>
          {/* <!-- novo agendamento --> */}
          <div className={styles.novoAgendamento}>
            <h1>NOVO AGENDAMENTO</h1>
            <h5>Selecione um escritório para prosseguir</h5>
            <div className={styles.botoes}>
              <div>
                <a href="#">
                  <button className={styles.btnSantos}>Santos</button>
                </a>
              </div>

              <div>
                <a href="#">
                  <button className={styles.btnSp}>São Paulo</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
