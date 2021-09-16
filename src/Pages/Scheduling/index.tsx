import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./styles.module.scss";
import { Link, useParams, useHistory } from "react-router-dom";
import backButton from "../../Assets/Images/backButton.svg";
import locationIcon from "../../Assets/Images/localizacao.svg";
import calendarIcon from "../../Assets/Images/calendarIcon.svg";
import personIcon from "../../Assets/Images/personIcon.svg";
import tableIcon from "../../Assets/Images/tableIcon.svg";
import Calendar from "react-calendar";

import spMap from "../../Assets/Images/spMap.svg";
import confirmButton from "../../Assets/Images/confirmButton.svg";
import "react-calendar/dist/Calendar.css";
import { FormEvent, useEffect, useState } from "react";
import { ArraySeatsFilter } from "../../utils/arraySeatsFilter";
import { api } from "../../services/api";
import { checkToken } from "../../utils/checkToken";
import { FormatDateToBackend } from "../../utils/formatDateToBackend";
import toast, { Toaster } from "react-hot-toast";

type paramsProps = {
  id: string;
};
export const Scheduling = () => {
  const token = checkToken();
  const spSectors = [1, 2, 3, 4];
  const sanSectors = [1, 2];
  const [office, setOffice] = useState("");
  const [sector, setSector] = useState("");
  const [seat, setSeat] = useState("");
  const [scheduleDate, setScheduleDate] = useState(new Date());

  const [arrAvailableSeats, setArrAvailableSeats] = useState<Array<number>>([]);

  const [scheduledPeople, setScheduledPeople] = useState(0);

  const params = useParams<paramsProps>();
  const history = useHistory();
  useEffect(() => {
    setOffice(params.id);
  }, [params.id]);

  useEffect(() => {
    setArrAvailableSeats(ArraySeatsFilter(sector, office));
  }, [sector]);

  useEffect(() => {
    const handleHowManyAreScheduleByDate = async () => {
      try {
        api
          .get(`/scheduling/todaySchedulings`, {
            params: { date: FormatDateToBackend(scheduleDate), office },
            headers: { Authorization: "Bearer " + token },
          })
          .then((response) => {
            setScheduledPeople(response.data.length);
            if (office === "1" && response.data.length == 2) {
              toast.error(
                "Dia com capacidade máxima! Não será possível Agendar."
              );
            } else if (office === "2" && response.data.length == 40) {
              toast.error(
                "Dia com capacidade máxima! Não será possível Agendar."
              );
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    handleHowManyAreScheduleByDate();
  }, [scheduleDate]);

  const handleCreateAScheduling = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const date = FormatDateToBackend(scheduleDate);
      await api.post(
        "scheduling",
        {
          office: Number(office),
          date: date.toString(),
          sector: Number(sector),
          seat: Number(seat),
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      toast.success("Agendamento criado com sucesso!");

      setTimeout(() => history.push("/home"), 2000);
    } catch (err) {
      toast.error("Não foi possível realizar o seu agendamento!");
    }
  };

  // Calendar
  const disabledDates = [new Date("2021-09-16"), new Date("2021-09-18")];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <header className={styles.pageTitleArea}>
          <div className={styles.title}>
            <h2>Novo Agendamento </h2>
            <Link to={"/home"}>
              <img src={backButton} alt="" />
            </Link>
          </div>
          <div className={styles.office}>
            <img src={locationIcon} alt="" />
            <p>{office === "1" ? "São Paulo" : "Santos"}</p>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.calendarArea}>
            <h3>
              <img src={calendarIcon} alt="" /> Selecione uma data para
              prosseguir
            </h3>
            <div>
              <Calendar
                onChange={setScheduleDate}
                value={scheduleDate}
                minDate={new Date()}
                maxDetail={"month"}
                tileDisabled={({ date, view }) =>
                  view === "month" && // Block day tiles only
                  disabledDates.some(
                    (disabledDate) =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate() + 1
                  )
                }
              />
            </div>
            <p>
              <img src={personIcon} alt="" /> Pessoas agendadas:{" "}
              {scheduledPeople}
            </p>
          </div>
          <div className={styles.schedulingOptionsMapArea}>
            <h3>
              <img src={tableIcon} /> Selecione sua estação de trabalho
            </h3>
            <div className={styles.schedulingOptionsAndMapContainer}>
              <div className={styles.selectionArea}>
                <label>
                  Setor <br />
                  <select onChange={({ target }) => setSector(target.value)}>
                    <option selected> </option>
                    {office === "1"
                      ? spSectors.map((spSector) => {
                          return (
                            <option value={spSector}>Setor {spSector}</option>
                          );
                        })
                      : sanSectors.map((sanSector) => {
                          return (
                            <option value={sanSector}>Setor {sanSector}</option>
                          );
                        })}
                  </select>
                </label>{" "}
                <br />
                <label>
                  Estação <br />
                  <select onChange={({ target }) => setSeat(target.value)}>
                    <option selected> </option>
                    {arrAvailableSeats.map((seatNumber) => {
                      return <option value={seatNumber}>{seatNumber} </option>;
                    })}
                  </select>
                </label>
              </div>
              <div className={styles.mapArea}>
                <img src={spMap} alt="" />
              </div>
              <form
                className={styles.schedulingButtonArea}
                onSubmit={handleCreateAScheduling}
              >
                <button type="submit">
                  <img src={confirmButton} alt="" />
                  <br />
                  Agendar
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
