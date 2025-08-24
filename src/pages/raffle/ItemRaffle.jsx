// src/components/ItemRaffle.jsx
import { useNavigate } from "react-router"
import styles from './styles/raffleItem.module.css'

export default function ItemRaffle({ raffle }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/raffles/${raffle.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={styles.raffleItem}
    >
      <h3>{raffle.name}</h3>
      <p>📅 Fecha: {raffle.date}</p>
      <p>💰 Precio ticket: {raffle.ticket_price}</p>
    </div>
  )
}
