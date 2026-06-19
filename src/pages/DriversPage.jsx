import { useEffect, useState } from "react"
import { getDrivers, createDriver } from "../services/driversService"
import DriverForm from "../components/DriverForm"

export default function DriversPage() {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDrivers()
  }, [])

  async function loadDrivers() {
    setLoading(true)
    const data = await getDrivers()
    setDrivers(data)
    setLoading(false)
  }

  async function handleAddDriver(newDriver) {
    try {
      await createDriver(newDriver)
      await loadDrivers()
    } catch (error) {
      alert("Не удалось добавить водителя")
    }
  }

  return (
    <div>
      <h2>Водители</h2>

      <DriverForm onAdd={handleAddDriver} />

      {loading ? (
        <p>Загрузка...</p>
      ) : drivers.length === 0 ? (
        <p>Водителей пока нет</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Стаж</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.last_name}</td>
                <td>{driver.first_name}</td>
                <td>{driver.middle_name}</td>
                <td>{driver.experience_years}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}