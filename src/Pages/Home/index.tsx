import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { api } from "../../services/api";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

import Modal from "react-modal";
import "./modal.scss";

/* pagination buttons icons */
import firstPageButton from "../../Assets/Images/firstPageButton.svg";
import nextPageButton from "../../Assets/Images/nextPageButton.svg";
import previousPageButton from "../../Assets/Images/previousPageButton.svg";
import lastPageButton from "../../Assets/Images/lastPageButton.svg";
import { LatestScheduling } from "../../components/LatestScheduling";
import { formatDateGetOfWeek } from "../../utils/formatDateGetOfWeek";
import toast, { Toaster } from "react-hot-toast";

import previousPageMobile from "../../Assets/Images/previousPageMobile.svg";
import nextPageMobile from "../../Assets/Images/nextPageMobile.svg";
import { FormatDateToBackend } from "../../utils/formatDateToBackend";

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
    const response = await api.get(`/scheduling/last/user`, {
      headers: { Authorization: "Bearer " + token },
    }); // by the default this route uses the page 1

    const lastFiveSchedulings = response.data;

    // if the array length is bigger than 3 it sets the array size to 3
    if (lastFiveSchedulings.length > 5) lastFiveSchedulings.length = 5;

    setLatestScheduling(lastFiveSchedulings);
  };

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

  // delete Scheduling
  const [deleteSchedulingId, setDeleteSchedulingId] = useState(0);
  const [buttonModalDisable, setButtonModalDisable] = useState(false);
  const handleDeleteScheduling = async (id: number) => {
    try {
      setButtonModalDisable(true);
      const response = await api.delete(`scheduling/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await loadLatestScheduling();

      toast.success("Seu agendamento foi cancelado com sucesso!");
    } catch {
      toast.error("Não foi possível cancelar o seu agendamento!");
    } finally {
      setButtonModalDisable(false);
      handleCloseConfirmationModal();
    }
  };

  /* Modal */
  const [confirmationModal, setConfirmationModal] = useState(false);
  const handleOpenConfirmationModal = (schedulingId: number) => {
    setConfirmationModal(true);
    setDeleteSchedulingId(schedulingId);
  };
  const handleCloseConfirmationModal = () => {
    setConfirmationModal(false);
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
              <div className={styles.pagesMobile}>
                <a onClick={handleDecreasePagination}>
                  <img src={previousPageMobile} alt="" />
                </a>{" "}
                <p> {page}</p>
                <a onClick={handleIncreasePagination}>
                  <img src={nextPageMobile} alt="" />
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
                  dateToBack={data.date}
                  office={data.office}
                  table={data.seat.toString()}
                  dayOfWeek={formatDateGetOfWeek(data.date)}
                  sector={data.sector}
                  setModal={handleOpenConfirmationModal}
                  id={data.id}
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
                <Link to="/scheduling/2">
                  <button className={`${styles.btnSantos} ${styles.button}`}>
                    Santos
                  </button>
                </Link>
              </div>

              <div>
                <Link to="/scheduling/1">
                  <button className={`${styles.btnSp} ${styles.button}`}>
                    São Paulo
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal
        isOpen={confirmationModal}
        onRequestClose={handleCloseConfirmationModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 5.99988H5H21"
            stroke="#737380"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
            stroke="#737380"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <h2>Excluir Agendamento</h2>
        <p>Tem certeza que você deseja o agendamento?</p>

        <div className="confirmArea">
          <button
            type="button"
            onClick={handleCloseConfirmationModal}
            disabled={buttonModalDisable}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => handleDeleteScheduling(deleteSchedulingId)}
            disabled={buttonModalDisable}
          >
            Sim, Excluir
          </button>
        </div>
      </Modal>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
