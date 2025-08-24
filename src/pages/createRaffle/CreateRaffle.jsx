// src/pages/CreateRaffle.jsx
import { useState } from "react"
import { useNavigate } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { createRaffle,addTickets } from "../../service/raffleServices"
import styles from './styles/createRaffle.module.css'
export default function CreateRaffle() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    ticket_price: "",
    ticket_amount: "",
    date: "",
  })

  const mutation = useMutation({
    mutationFn: async () => {
      // 1. Crear sorteo
      const raffle = await createRaffle({
        name: form.name,
        date: form.date,
        ticket_price: form.ticket_price,
      })

      if (!raffle || raffle.length === 0) throw new Error("No se creó el sorteo")
      const raffleId = raffle[0].id

      // 2. Crear tickets (letra A por defecto)
      await addTickets(raffleId, "A", Number(form.ticket_amount))

      return raffle[0]
    },
    onSuccess: () => {
      alert("✅ Sorteo creado con éxito")
      navigate("/") // volver al home
    },
    onError: (err) => {
      console.error(err)
      alert("❌ Error al crear sorteo")
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Crear nuevo sorteo</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">
              Nombre del sorteo
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Ej: Sorteo iPhone 15 Pro"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="ticket_price">
              Precio del ticket
            </label>
            <input
              id="ticket_price"
              type="number"
              name="ticket_price"
              placeholder="10"
              value={form.ticket_price}
              onChange={handleChange}
              className={styles.input}
              min="1"
              step="0.01"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="ticket_amount">
              Cantidad de tickets
            </label>
            <input
              id="ticket_amount"
              type="number"
              name="ticket_amount"
              placeholder="100"
              value={form.ticket_amount}
              onChange={handleChange}
              className={styles.input}
              min="1"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="date">
              Fecha del sorteo
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={styles.input}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={mutation.isLoading}
            className={styles.button}
          >
            {mutation.isLoading ? (
              <span className={styles.loadingText}>Creando...</span>
            ) : (
              "Crear sorteo"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
