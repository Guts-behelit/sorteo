import { supabaseDb } from "../service/supabaseClient"
import { useQuery } from "@tanstack/react-query"

async function getCustomerById(customerId) {
  const { data, error } = await supabaseDb
    .from("customers")
    .select("*")
    .eq("id", customerId)
    .single()

  if (error) throw error
  return data
}

export function useCustomerById(customerId) {
  return useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomerById(customerId),
    enabled: !!customerId,
  })
}