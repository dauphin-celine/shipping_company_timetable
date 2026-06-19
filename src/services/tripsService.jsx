import { supabase } from "../supabaseClient"

export async function getTrips() {
  const { data, error } = await supabase
    .from("trips")
    .select(`
      id,
      route_id,
      departure_date,
      return_date,
      routes (
        id,
        name,
        distance,
        days_on_route,
        base_payment
      )
    `)
    .order("id", { ascending: true })

  if (error) {
    console.error("Ошибка загрузки рейсов:", error)
    return []
  }

  return data
}

export async function createTrip(trip) {
  const { data, error } = await supabase
    .from("trips")
    .insert([trip])
    .select()

  if (error) {
    console.error("Ошибка добавления рейса:", error)
    throw error
  }

  return data
}