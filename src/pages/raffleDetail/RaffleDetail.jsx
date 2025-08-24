// src/pages/RaffleDetail.jsx
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { getTicketsByRaffle } from "../../service/raffleServices"
import BuyTicketsForm from "./ByTicketsForm"
import styles from './styles/raffleDetail.module.css'
import TicketItem from "./Ticket"
import Email from "./Email"


export default function RaffleDetail() {
  const { id } = useParams()

  const { data: tickets, isLoading, error } = useQuery({
    queryKey: ["tickets", id],
    queryFn: () => getTicketsByRaffle(id),
    enabled: !!id, // solo ejecuta si hay id
  })
  console.log('tickets tomados: ',tickets);

  if (isLoading) return <p>Cargando tickets...</p>
  if (error) return <p>❌ Error cargando tickets</p>

  return (
    <div className={styles.detailContainer}>
      <h2 className={styles.title}>Tickets del sorteo {'(nombre de sorteo)'}</h2>
      <div className={styles.listTicketContainer}>
        {tickets.length === 0 ? (
        <p className={styles.empty}>No hay tickets aún</p>
      ) : (
        <ul className={styles.list}>
          {tickets.map((t) => (
          <TicketItem  key={t.id} ticket={t}/>
          ))}
        </ul>
      )}
      </div>
      <BuyTicketsForm raffleId={id} />
      <Email/>
    </div>
  );
}
