import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import localizacaoIcon from "../../Assets/Images/localizacao.svg";
import cancelSchedulingIcon from "../../Assets/Images/cancelScheduling.svg";
import tableIcon from "../../Assets/Images/tableIcon.svg";
import personIcon from "../../Assets/Images/personIcon.svg";
import viewDivIcon from "../../Assets/Images/viewDivIcon.svg";
import closeDivIcon from "../../Assets/Images/closeDivIcon.svg";
import { api } from "../../services/api";
import { FormatDateToBackend } from "../../utils/formatDateToBackend";
import { checkToken } from "../../utils/checkToken";

type LatestSchedulingProps = {
  id: number;
  dayOfWeek: string;
  date: string;
  dateToBack: Date;
  office: number;
  table: string;
  sector: string;
  setModal: (id: number) => void;
};
export const LatestScheduling = ({
  setModal,
  ...props
}: LatestSchedulingProps) => {
  const [expandDiv, setExpandDiv] = useState(false);
  const [scheduledPeople, setScheduledPeople] = useState(0);
  const token = checkToken();
  useEffect(() => {
    const handleHowManyAreScheduleByDate = async () => {
      try {
        api
          .get(`/scheduling/todaySchedulings`, {
            params: {
              date: props.dateToBack,
              office: props.office,
            },
            headers: { Authorization: "Bearer " + token },
          })
          .then((response) => {
            console.log(response.data)
            setScheduledPeople(response.data.length);
          });
      } catch (err) {
        console.log(err);
      }
    };
    handleHowManyAreScheduleByDate();
  }, []);
  return (
    <>
      <div
        className={`${styles.agendamento} ${
          !expandDiv ? "" : styles.agendamentoExpanded
        }`}
      >
        <h2>
          {props.dayOfWeek}, {props.date}
        </h2>
        <h3>
          <img src={localizacaoIcon} />
          {props.office === 1 ? "São Paulo" : "Santos"}
        </h3>
        <h3>
          <img src={tableIcon} />
          Mesa {props.table} | Setor {props.sector}
        </h3>
        <h3>
          <img src={personIcon} />
          {scheduledPeople} Pessoas agendadas
        </h3>
      </div>

      <div className={styles.visualEdit}>
        <h5>
          {!expandDiv ? (
            <a onClick={() => setExpandDiv(!expandDiv)}>
              <img src={viewDivIcon} /> Visualizar
            </a>
          ) : (
            <a onClick={() => setExpandDiv(!expandDiv)}>
              <img src={closeDivIcon} /> Fechar
            </a>
          )}
        </h5>
        <h5>
          <a onClick={() => setModal(props.id)}>
            <img src={cancelSchedulingIcon} />
            Cancelar Agendamento
          </a>
        </h5>
      </div>
    </>
  );
};
