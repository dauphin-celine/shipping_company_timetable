import { supabase } from "../supabaseClient"

export async function getRoutes() {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    console.error("Ошибка загрузки маршрутов:", error)
    return []
  }

  return data
}

export async function createRoute(route) {
  const { data, error } = await supabase
    .from("routes")
    .insert([route])
    .select()

  if (error) {
    console.error("Ошибка добавления маршрута:", error)
    throw error
  }

  return data
}