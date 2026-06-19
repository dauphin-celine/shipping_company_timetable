import { supabase } from "../supabaseClient"

export async function getExperienceRates() {
  const { data, error } = await supabase
    .from("experience_rates")
    .select("*")
    .order("min_years", { ascending: true })

  if (error) {
    console.error("Ошибка загрузки коэффициентов стажа:", error)
    return []
  }

  return data
}

export function findCoeffByExperience(experienceYears, rates) {
  const matchedRate = rates.find((rate) => {
    const min = Number(rate.min_years)
    const max = Number(rate.max_years)
    const exp = Number(experienceYears)

    return exp >= min && exp <= max
  })

  return matchedRate ? Number(matchedRate.coeff) : null
}