
// src/pages/rafflepage.jsx
import { useQuery } from "@tanstack/react-query"
import { getRaffles } from "../../service/raffleServices"
import { useNavigate } from "react-router"
import ItemRaffle from "./ItemRaffle"
import styles from './styles/rafflePage.module.css'

export default function RafflePage() {
  const navigate = useNavigate()
   const { data: raffles, isLoading, isError } = useQuery({
    queryKey: ["raffles"],
    queryFn: getRaffles,
  })

  if (isLoading) return <p>Cargando rifas...</p>
  if (isError) return <p>Error al obtener rifas</p>

  return (
    <div className={styles.rafflePageContainer}>
      <button className={styles.btnCreate}
      onClick={()=>{
        navigate('/raffles/create')
      }}>Crear Sorteo</button>

      {raffles && raffles.length > 0 ? (
        <ul>
          {raffles.map((raffle) => (
            <ItemRaffle key={raffle.id +'$%##%'} raffle={raffle}/>
          ))}
        </ul>
      ) : (
        <p>No hay rifas disponibles</p>
      )}
    </div>
  )
}

