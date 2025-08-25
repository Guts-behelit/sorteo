import { useState } from "react"
import { useCustomerById } from "../../hooks/useCustomerById"
import { useTicketByNumber } from "../../hooks/useTicketByNumber"
import { useConfetti } from "../../hooks/useConfetti"
import styles from './styles/userSearch.module.css'

const CODE_REGEX = /^[A-Za-z][0-9]{4}$/ // 1 letra + 4 números

export default function UserSearch({ raffleId }) {
  const [number, setNumber] = useState("")
  const [searchNumber, setSearchNumber] = useState("")
  const { launch, ConfettiView } = useConfetti()

  // 1) Buscar ticket
  const { data: ticket, isLoading: loadingTicket, isError: errorTicket } =
    useTicketByNumber(raffleId, searchNumber)

  // 2) Si existe ticket, buscar customer
  const { data: customer, isLoading: loadingCustomer } = useCustomerById(
    ticket?.customer_id ?? null
  )

  const handleSearch = () => {
    const normalized = number.trim().toUpperCase()
    if(!CODE_REGEX.test(normalized)){
      console.error("el codigo es invalido")
    }else{
      setSearchNumber(normalized)
      launch()
    }
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Buscar Ganador</h3>
      <div className={styles.form}>
        <input
        className={styles.inputSearch}
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Ej: A0007"
      />
      <button 
      className={styles.btnSearch}
      onClick={handleSearch}>Buscar</button>
      </div>
      <ConfettiView/>
      {loadingTicket && <p>🔎 Buscando ticket...</p>}
      {errorTicket && <p>❌ Ticket no encontrado</p>}

      {ticket && (
        <div className={styles.ticketCard}>
          <p className={styles.ticketNumber}><b>Ticket:</b> {ticket.number}</p>
          {ticket.customer_id ? (
            loadingCustomer ? (
              <p className={styles.loading}>Cargando cliente...</p>
            ) : (
              customer && (
                <div>
                  <p><b>Cliente:</b> {customer.full_name}</p>
                  <p>Email: {customer.email}</p>
                  <p>Tel: {customer.phone}</p>
                </div>
              )
            )
          ) : (
            <p>Este ticket aún no tiene dueño.</p>
          )}
        </div>
      )}
    </div>
  )
}