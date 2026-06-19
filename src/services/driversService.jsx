import { supabase } from "../supabaseClient"

export async function getDrivers() {
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    console.error("Ошибка загрузки водителей:", error)
    return []
  }

  return data
}

export async function createDriver(driver) {
  const { data, error } = await supabase
    .from("drivers")
    .insert([driver])
    .select()

  if (error) {
    console.error("Ошибка добавления водителя:", error)
    throw error
  }

  return data
}