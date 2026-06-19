import { useEffect, useState } from "react"
import { getTrips } from "../services/tripsService"
import { getDrivers } from "../services/driversService"
import { getTripDrivers, createTripDriver } from "../services/tripDriversService"
import { getExperienceRates } from "../services/experienceRatesService"
import TripDriverForm from "../components/TripDriverForm"

export default function TripDriversPage() {
  const [trips, setTrips] = useState([])
  const [drivers, setDrivers] = useState([])
  const [tripDrivers, setTripDrivers] = useState([])
  const [experienceRates, setExperienceRates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPageData()
  }, [])

  async function loadPageData() {
    setLoading(true)

    const [tripsData, driversData, tripDriversData, experienceRatesData] =
      await Promise.all([
        getTrips(),
        getDrivers(),
        getTripDrivers(),
        getExperienceRates(),
      ])

    setTrips(tripsData)
    setDrivers(driversData)
    setTripDrivers(tripDriversData)
    setExperienceRates(experienceRatesData)
    setLoading(false)
  }

async function handleAddTripDriver(newTripDriver) {
  try {
    await createTripDriver(newTripDriver)
    await loadPageData()
  } catch (error) {
    console.error(error)

    if (error?.code === "23505") {
      alert("Этот водитель уже назначен на данный рейс")
      return
    }

    alert("Не удалось назначить водителя на рейс")
  }
}

  return (
    <div>
      <h2>Водители в рейсах</h2>

      <TripDriverForm
        trips={trips}
        drivers={drivers}
        experienceRates={experienceRates}
        onAdd={handleAddTripDriver}
      />

      {loading ? (
        <p>Загрузка...</p>
      ) : tripDrivers.length === 0 ? (
        <p>Назначений пока нет</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Рейс</th>
              <th>Маршрут</th>
              <th>Водитель</th>
              <th>Роль</th>
              <th>Премия</th>
              <th>Коэфф. стажа</th>
              <th>Доля</th>
              <th>Итоговая оплата</th>
            </tr>
          </thead>

          <tbody>
            {tripDrivers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.trip_id}</td>
                <td>{item.trips?.routes?.name || "-"}</td>
                <td>
                  {item.drivers
                    ? `${item.drivers.last_name} ${item.drivers.first_name} ${item.drivers.middle_name}`
                    : "-"}
                </td>
                <td>{item.role}</td>
                <td>{item.bonus}</td>
                <td>{item.experience_coeff}</td>
                <td>{item.payment_share}</td>
                <td>{item.calculated_payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}