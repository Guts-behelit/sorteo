// src/components/BuyTicketsForm.tsx
import { useState, useMemo } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTicketsByRaffle,
  createCustomer,
  assignTicketsByRaffle
} from "../../service/raffleServices"
import styles from './styles/byTicketsForm.module.css'
import { useUserStore } from "../../store/userStore"

export default function BuyTicketsForm({ raffleId }) {
  const changeDataUser = useUserStore((state)=> state.setDataUser);
  const dataState = useUserStore((state)=> state.dataUser)
  const qc = useQueryClient()

  // 1) Traer tickets del sorteo
  const { data: tickets = [], isLoading, isError } = useQuery({
    queryKey: ["tickets", raffleId],
    queryFn: () => getTicketsByRaffle(raffleId),
    enabled: !!raffleId,
  })

  // 2) Calcular disponibilidad
  const availableTickets = useMemo(
    () => tickets.filter((t) => !t.customers), // Ojo: en tu data viene "customers"
    [tickets]
  )
  const availableCount = availableTickets.length

  // 3) Estado del formulario
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    amount: ""
  })

  const canSubmit =
    form.full_name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "" &&
    Number(form.amount) > 0 &&
    Number(form.amount) <= availableCount

  // 4) Mutación compuesta
  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const amount = Number(form.amount)

      // 1. Crear cliente
      const customer = await createCustomer({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      })
      console.log('customer de mutation',customer)
      // 2. Escoger los tickets libres
      const chosenTickets = availableTickets.slice(0, amount)
      console.log('chosentickets : ',chosenTickets);
      // 3. Asignarlos al cliente
      await assignTicketsByRaffle(raffleId, customer.id, chosenTickets)

      return customer
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tickets", raffleId] })
      setForm({ full_name: "", email: "", phone: "", amount: "" })
      alert("✅ Compra realizada y tickets asignados.")
      changeDataUser(form)
      console.log('data zustand: ',dataState)
    },
    onError: (err) => {
      console.error(err)
      alert(err?.message ?? "❌ Ocurrió un error en la compra.")
    },
  })

  const handleChange =
    (name) =>
    (e) => {
      let value = e.target.value
      if (name === "amount") {
        const n = parseInt(value, 10)
        if (isNaN(n)) value = ""
        else if (n < 0) value = 0
        else if (n > availableCount) value = availableCount
        else value = n
      }
      setForm((prev) => ({ ...prev, [name]: value }))
    }

  if (isLoading) return <p>Cargando disponibilidad...</p>
  if (isError) return <p>❌ Error al cargar tickets</p>

   return (
    <div className={styles.container}>
      <h3 className={styles.title}>Compra tus Tickets</h3>
      <p className={styles.available}>🎟️ Disponibles: {availableCount}</p>

      <div className={styles.field}>
        <label>Nombre completo</label>
        <input
          type="text"
          value={form.full_name}
          onChange={handleChange("full_name")}
          placeholder="Juan Pérez"
        />
      </div>

      <div className={styles.field}>
        <label>Correo</label>
        <input
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className={styles.field}>
        <label>Celular</label>
        <input
          type="tel"
          value={form.phone}
          onChange={handleChange("phone")}
          placeholder="999999999"
        />
      </div>

      <div className={styles.field}>
        <label>Cantidad de tickets</label>
        <input
          type="number"
          value={form.amount}
          onChange={handleChange("amount")}
          placeholder="0"
          min={0}
          max={availableCount}
        />
      </div>

      <button
        className={styles.buttonBuy}
        onClick={() => purchaseMutation.mutate()}
        disabled={!canSubmit || purchaseMutation.isLoading}
      >
        {purchaseMutation.isLoading ? "Procesando..." : "Comprar"}
      </button>
    </div>
  )
}

