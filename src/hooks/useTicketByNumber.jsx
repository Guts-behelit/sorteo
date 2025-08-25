import { supabaseDb } from "../service/supabaseClient"
import { useQuery } from "@tanstack/react-query"

async function getTicketByNumber(raffleId, number) {
  const { data, error } = await supabaseDb
    .from("tickets")
    .select("*")
    .eq("raffle_id", raffleId)
    .eq("number", number)
    .single()

  if (error) throw error
  return data
}

export function useTicketByNumber(raffleId, number) {
  return useQuery({
    queryKey: ["ticket", raffleId, number],
    queryFn: () => getTicketByNumber(raffleId, number),
    enabled: !!raffleId && !!number, // solo corre si hay valores
  })
}