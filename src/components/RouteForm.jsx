import { useState } from "react"

export default function RouteForm({ onAdd }) {
  const [name, setName] = useState("")
  const [distance, setDistance] = useState("")
  const [daysOnRoute, setDaysOnRoute] = useState("")
  const [basePayment, setBasePayment] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name || !distance || !daysOnRoute || !basePayment) {
      alert("Заполните все поля")
      return
    }

    const newRoute = {
      name: name.trim(),
      distance: Number(distance),
      days_on_route: Number(daysOnRoute),
      base_payment: Number(basePayment),
    }

    await onAdd(newRoute)

    setName("")
    setDistance("")
    setDaysOnRoute("")
    setBasePayment("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Добавить маршрут</h3>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Название маршрута"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Дистанция"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Дней в пути"
          value={daysOnRoute}
          onChange={(e) => setDaysOnRoute(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Базовая оплата"
          value={basePayment}
          onChange={(e) => setBasePayment(e.target.value)}
        />
      </div>

      <button type="submit">Добавить маршрут</button>
    </form>
  )
}