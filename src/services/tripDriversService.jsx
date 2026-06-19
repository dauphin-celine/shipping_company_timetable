import { supabase } from "../supabaseClient"

export async function getTripDrivers() {
  const { data, error } = await supabase
    .from("trips_drivers")
    .select(`
      id,
      trip_id,
      driver_id,
      role,
      bonus,
      experience_coeff,
      payment_share,
      calculated_payment,
      trips (
        id,
        departure_date,
        return_date,
        route_id,
        routes (
          id,
          name,
          base_payment
        )
      ),
      drivers (
        id,
        last_name,
        first_name,
        middle_name,
        experience_years
      )
    `)
    .order("id", { ascending: true })

  if (error) {
    console.error("Ошибка загрузки назначений водителей:", error)
    return []
  }

  return data
}

export async function getDriversCountForTrip(tripId) {
  const { count, error } = await supabase
    .from("trips_drivers")
    .select("*", { count: "exact", head: true })
    .eq("trip_id", tripId)

  if (error) {
    console.error("Ошибка подсчета водителей в рейсе:", error)
    return 0
  }

  return count || 0
}

export async function createTripDriver(tripDriver) {
  const { data, error } = await supabase
    .from("trips_drivers")
    .insert([tripDriver])
    .select()

  if (error) {
    console.error("Ошибка добавления водителя в рейс:", error)
    throw error
  }

  return data
}