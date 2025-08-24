import styles from './styles/ticket.module.css'
import ticketImage from '../../../public/img/banner2.png'
import xImage from '../../../public/img/x.png'
export default function TicketItem({ticket}) {
  return (
    <div className={styles.ticketItem}>
      <img className={styles.ticketImage} src={ticketImage} alt="" />
      <span className={styles.number}>{ticket.number}</span>
      <img className={ ticket.customers ? styles.xImage:styles.xNoneImage} src={xImage} alt="" />
    </div>
  )
}
