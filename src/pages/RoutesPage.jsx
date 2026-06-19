import { useEffect, useState } from "react"
import { getRoutes, createRoute } from "../services/routesService"
import RouteForm from "../components/RouteForm"

export default function RoutesPage() {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRoutes()
  }, [])

  async function loadRoutes() {
    setLoading(true)
    const data = await getRoutes()
    setRoutes(data)
    setLoading(false)
  }

  async function handleAddRoute(newRoute) {
    try {
      await createRoute(newRoute)
      await loadRoutes()
    } catch (error) {
      alert("Не удалось добавить маршрут")
    }
  }

  return (
    <div>
      <h2>Маршруты</h2>

      <RouteForm onAdd={handleAddRoute} />

      {loading ? (
        <p>Загрузка...</p>
      ) : routes.length === 0 ? (
        <p>Маршрутов пока нет</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Дистанция</th>
              <th>Дней</th>
              <th>Оплата</th>
            </tr>
          </thead>

          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td>{route.id}</td>
                <td>{route.name}</td>
                <td>{route.distance}</td>
                <td>{route.days_on_route}</td>
                <td>{route.base_payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}