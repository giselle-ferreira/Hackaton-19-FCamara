import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import localizacaoIcon from "../../Assets/Images/localizacao.svg";
import cancelSchedulingIcon from "../../Assets/Images/cancelScheduling.svg";
import tableIcon from "../../Assets/Images/tableIcon.svg";
import personIcon from "../../Assets/Images/personIcon.svg";
import viewDivIcon from "../../Assets/Images/viewDivIcon.svg";
import closeDivIcon from "../../Assets/Images/closeDivIcon.svg";
import { api } from "../../services/api";
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
          <img src={localizacaoIcon} alt="ícone de localização"/>
          {props.office === 1 ? "São Paulo" : "Santos"}
        </h3>
        <h3>
          <img src={tableIcon} alt="ícone de uma mesa"/>
          Mesa {props.table} | Setor {props.sector}
        </h3>
        <h3>
          <img src={personIcon} alt="ícone de uma pessoa" />
          {scheduledPeople} Pessoas agendadas
        </h3>
      </div>

      <div className={styles.visualEdit}>
        <h5>
          {!expandDiv ? (
            <button onClick={() => setExpandDiv(!expandDiv)}>
              <img src={viewDivIcon} alt="ícone de um olho aberto - abrir"/> Visualizar
            </button>
          ) : (
            <button onClick={() => setExpandDiv(!expandDiv)}>
              <img src={closeDivIcon} alt="ícone de um olho com bloqueio - fechar"/> Fechar
            </button>
          )}
        </h5>
        <h5>
          <button onClick={() => setModal(props.id)}>
            <img src={cancelSchedulingIcon} alt="Icone de Cancelamento"/>
            Cancelar Agendamento
          </button>
        </h5>
      </div>
    </>
  );
};
