import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { api } from "../../services/api";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

//Current Scheduling
import localizacaoIcon from "../../Assets/Images/localizacao.svg";
import cancelSchedulingIcon from "../../Assets/Images/cancelScheduling.svg";
import tableIcon from "../../Assets/Images/tableIcon.svg";
import personIcon from "../../Assets/Images/personIcon.svg";
import viewDivIcon from "../../Assets/Images/viewDivIcon.svg";
import closeDivIcon from "../../Assets/Images/closeDivIcon.svg";

/* pagination buttons icons */
import firstPageButton from "../../Assets/Images/firstPageButton.svg";
import nextPageButton from "../../Assets/Images/nextPageButton.svg";
import previousPageButton from "../../Assets/Images/previousPageButton.svg";
import lastPageButton from "../../Assets/Images/lastPageButton.svg";
import { LatestScheduling } from "../../components/LatestScheduling";
import { formatDateGetOfWeek } from "../../utils/formatDateGetOfWeek";

type schedulingData = {
  id: number;
  office: number;
  sector: string;
  seat: string;
  date: Date;
};

export const Home = () => {
  const userContext = useContext(UserContext);
  const token = window.localStorage.getItem("fcalendartoken");
  const [schedulingData, setSchedulingData] = useState<schedulingData[]>([]);
  const [latestScheduling, setLatestScheduling] = useState<schedulingData[]>(
    []
  );
  /* pagination states  */
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState<number[]>();

  /*Expanding div */

  const handlePagination = async () => {
    const response = await api.get(`scheduling/all/user`, {
      headers: { Authorization: "Bearer " + token },
    });
    const pagesCalc = Math.ceil(response.data.length / 5);
    const pages = [];
    for (var i = 0; i < pagesCalc; i++) {
      pages.push(i);
    }

    setLastPage(pagesCalc);

    return setNumberOfPages(pages);
  };

  const loadSchedulingHistory = async () => {
    const response = await api.get(`scheduling/user?page=${page}`, {
      headers: { Authorization: "Bearer " + token },
    });

    setSchedulingData(response.data);
  };

  const loadLatestScheduling = async () => {
    const response = await api.get(`scheduling/user`, {
      headers: { Authorization: "Bearer " + token },
    }); // by the default this route uses the page 1
    const lastThreeSchedulings = response.data;
    // if the array length is bigger than 3 it sets the array size to 3
    if (lastThreeSchedulings.length > 3) lastThreeSchedulings.length = 3;
    setLatestScheduling(lastThreeSchedulings);
  };
  console.log(latestScheduling);

  useEffect(() => {
    handlePagination();
    loadSchedulingHistory();
  }, [page]);
  useEffect(() => {
    loadLatestScheduling();
  }, []);
  // pagination functions
  const handleFirstPage = () => {
    setPage(1);
  };
  const handleDecreasePagination = () => {
    if (page >= 2) {
      setPage(page - 1);
    }
  };
  const handlePageSelect = (pageNumber: number) => {
    setPage(pageNumber);
  };
  const handleIncreasePagination = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  };
  const handleLastPage = () => {
    setPage(lastPage);
  };

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
              <table cellSpacing="0">
                <thead className={styles.tableTitle}>
                  <tr>
                    <th>Data</th>
                    <th>Estação de trabalho</th>
                  </tr>
                </thead>

                <tbody className={styles.tableBody}>
                  {schedulingData.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td>{formatDate(data.date)}</td>
                        <td>
                          {data.seat} - Setor {data.sector}{" "}
                          {data.office === 1 ? "(SP)" : "(SA)"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={styles.pages}>
                <a onClick={handleFirstPage}>
                  <img src={firstPageButton} alt="" />
                </a>{" "}
                <a onClick={handleDecreasePagination}>
                  <img src={previousPageButton} alt="" />
                </a>{" "}
                {numberOfPages?.map((pageNumber) => {
                  return (
                    <a
                      onClick={() => handlePageSelect(pageNumber + 1)}
                      className={`${
                        page === pageNumber + 1 ? styles.selectedPage : ""
                      }`}
                    >
                      {pageNumber + 1}
                    </a>
                  );
                })}
                <a onClick={handleIncreasePagination}>
                  <img src={nextPageButton} alt="" />
                </a>{" "}
                <a onClick={handleLastPage}>
                  <img src={lastPageButton} alt="" />
                </a>{" "}
              </div>
            </div>
          </div>

          {/* <!-- agendamentos atuais --> */}
          <div className={styles.agendamentosAtuais}>
            <h1>AGENDAMENTOS ATUAIS</h1>
            {latestScheduling.map((data) => {
              return (
                <LatestScheduling
                  date={formatDate(data.date)}
                  office={data.office}
                  table={data.seat.toString()}
                  dayOfWeek={formatDateGetOfWeek(data.date)}
                  sector={data.sector}
                  scheduledPeople={"60"}
                />
              );
            })}
          </div>
          {/* <!-- novo agendamento --> */}
          <div className={styles.novoAgendamento}>
            <h1>NOVO AGENDAMENTO</h1>
            <h5>Selecione um escritório para prosseguir</h5>
            <div className={styles.botoes}>
              <div>
                <Link to="/scheduling/1">
                  <button className={`${styles.btnSantos} ${styles.button}`}>
                    Santos
                  </button>
                </Link>
              </div>

              <div>
                <Link to="/scheduling/2">
                  <button className={`${styles.btnSp} ${styles.button}`}>
                    São Paulo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
