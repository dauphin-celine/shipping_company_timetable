import { useState } from "react"

export default function TripForm({ routes, onAdd }) {
  const [routeId, setRouteId] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    if (!routeId || !departureDate || !returnDate) {
      alert("Заполните все поля")
      return
    }

    if (returnDate < departureDate) {
      alert("Дата возвращения не может быть раньше даты отправки")
      return
    }

    const newTrip = {
      route_id: Number(routeId),
      departure_date: departureDate,
      return_date: returnDate,
    }

    await onAdd(newTrip)

    setRouteId("")
    setDepartureDate("")
    setReturnDate("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Добавить рейс</h3>

      <div style={{ marginBottom: "10px" }}>
        <select value={routeId} onChange={(e) => setRouteId(e.target.value)}>
          <option value="">Выберите маршрут</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Дата отправки:{" "}
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Дата возвращения:{" "}
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Добавить рейс</button>
    </form>
  )
}