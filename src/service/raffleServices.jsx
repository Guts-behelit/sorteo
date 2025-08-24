import { supabaseDb } from "./supabaseClient"
/**
 * tomar todos los sorteos
 */
export async function getRaffles() {
  const { data, error } = await supabaseDb
    .from('raffles')
    .select('*')
    .order('date', { ascending: true })

  if (error) console.error(error)
  return data
}
// Tomar todos los tickets de un sorteo
export async function getTicketsByRaffle(raffleId) {
  const { data, error } = await supabaseDb
    .from('tickets')
    .select('number,id,customers(full_name,email,phone)')
    .eq('raffle_id', raffleId)

  if (error) console.error(error)
  return data
}
// Toma los tickets de un cliente en especifico
export async function getTicketsByCustomer(customerId) {
  const { data, error } = await supabaseDb
    .from('tickets')
    .select('number, raffle_id, raffles(name, date, ticket_price)')
    .eq('customer_id', customerId)

  if (error) console.error(error)
  return data
}
// Toma toddos los clientes de un sorteo 
//observacion !!!!
export async function getCustomersByRaffle(raffleId) {
  const { data, error } = await supabaseDb
    .from('tickets')
    .select('customers(id, full_name, email, phone)')
    .eq('raffle_id', raffleId)

  if (error) console.error(error)

  // Eliminar duplicados (porque un cliente puede tener varios tickets)
  const uniqueCustomers = Array.from(
    new Map(data.map(c => [c.customers.id, c.customers])).values()
  )

  return uniqueCustomers
}

// Crear un sorteo 
export async function createRaffle({name,date,ticket_price}) {
  const { data, error } = await supabaseDb
    .from('raffles')
    .insert([
      { name, date, ticket_price: Number(ticket_price) }
    ])
    .select() // devuelve el registro insertado

  if (error) console.error(error)
  return data
}

//Crear un ticket
export async function createTicket(raffleId, customerId, number) {
  const { data, error } = await supabaseDb
    .from('tickets')
    .insert([
      { raffle_id: raffleId, customer_id: customerId, number }
    ])
    .select()

  if (error) console.error(error)
  return data
}

export async function createCustomer({full_name, email, phone}) {
  const { data, error } = await supabaseDb
    .from('customers')
    .insert([
      { full_name, email, phone }
    ])
    .select() // devuelve el registro insertado

  if (error) {
    console.error('Error creando cliente:', error)
    return null
  }

  return data[0] // retorna el primer (y único) cliente creado
}


export async function assignTicketsByRaffle(raffleId, customerId, idTickets) {
  // 2. Tomar los IDs de los tickets encontrados
  const ticketIds = idTickets.map(t => t.id);

  // 3. Actualizar esos tickets con el customerId
  const { data: updated, error: updateError } = await supabaseDb
    .from('tickets')
    .update({ 
      customer_id: customerId
    })
    .in('id', ticketIds)
    .select();

  if (updateError) {
    console.error('Error asignando tickets:', updateError);
    return null;
  }

  console.log(`✅ ${updated.length} tickets asignados a cliente ${customerId}`);
  return updated;
}

export async function assignTicketsToCustomer(raffleId,customerId,amount) {
  if (amount <= 0) return []

  // 1) Buscar IDs de tickets disponibles
  const { data: available, error: errAvail } = await supabaseDb
    .from("tickets")
    .select("id")
    .eq("raffle_id", raffleId)
    .is("customer_id", null)
    .order("number", { ascending: true })
    .limit(amount)

  if (errAvail) throw errAvail

  const ids = (available ?? []).map((t) => t.id)
  if (ids.length < amount) {
    throw new Error(
      `Solo hay ${ids.length} tickets disponibles y se solicitaron ${amount}.`
    )
  }

  // 2) Actualizar esos tickets con el customer
  const { data: updated, error: errUpd } = await supabaseDb
    .from("tickets")
    .update({ customer_id: customerId })
    .in("id", ids)
    .select()

  if (errUpd) throw errUpd
  return updated ?? []
}

export async function addTickets(raffleId, letter, amount) {
  // 1. Obtener el último número usado en este sorteo
  const { data: existing, error } = await supabaseDb
    .from('tickets')
    .select('number')
    .eq('raffle_id', raffleId)
    .order('number', { ascending: false })
    .limit(1)

  if (error) {
    console.error(error)
    return
  }

  let lastNumber = 0
  if (existing.length > 0) {
    // Quitar letras y convertir a número
    lastNumber = parseInt(existing[0].number.slice(1))
  }

  // 2. Generar nuevos tickets
  const newTickets = []
  for (let i = 1; i <= amount; i++) {
    const ticketNumber = String(lastNumber + i).padStart(4, '0')
    const ticketCode = `${letter}${ticketNumber}`

    newTickets.push({
      raffle_id: raffleId,
      customer_id: null, // nadie lo tiene aún
      number: ticketCode,
     // reserved_timestamp: null // aún libre
    })
  }

  // 3. Insertar en Supabase
  const { error: insertError } = await supabaseDb
    .from('tickets')
    .insert(newTickets)

  if (insertError) {
    console.error(insertError)
    return
  }

  console.log(`✅ ${amount} tickets agregados`)
}
