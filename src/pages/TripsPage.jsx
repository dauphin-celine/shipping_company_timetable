import { useEffect, useState } from "react"
import { getTrips, createTrip } from "../services/tripsService"
import { getRoutes } from "../services/routesService"
import TripForm from "../components/TripForm"

export default function TripsPage() {
  const [trips, setTrips] = useState([])
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPageData()
  }, [])

  async function loadPageData() {
    setLoading(true)

    const [tripsData, routesData] = await Promise.all([
      getTrips(),
      getRoutes(),
    ])

    setTrips(tripsData)
    setRoutes(routesData)
    setLoading(false)
  }

  async function handleAddTrip(newTrip) {
    try {
      await createTrip(newTrip)
      await loadPageData()
    } catch (error) {
      alert("Не удалось добавить рейс")
    }
  }

  return (
    <div>
      <h2>Рейсы</h2>

      <TripForm routes={routes} onAdd={handleAddTrip} />

      {loading ? (
        <p>Загрузка...</p>
      ) : trips.length === 0 ? (
        <p>Рейсов пока нет</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID рейса</th>
              <th>Маршрут</th>
              <th>Дата отправки</th>
              <th>Дата возвращения</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.id}</td>
                <td>{trip.routes?.name || `Маршрут #${trip.route_id}`}</td>
                <td>{trip.departure_date}</td>
                <td>{trip.return_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}