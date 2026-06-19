import { useMemo, useState } from "react"
import { getDriversCountForTrip, getTripDrivers } from "../services/tripDriversService"
import { findCoeffByExperience } from "../services/experienceRatesService"

export default function TripDriverForm({ trips, drivers, experienceRates, onAdd }) {
  const [tripId, setTripId] = useState("")
  const [driverId, setDriverId] = useState("")
  const [role, setRole] = useState("")
  const [bonus, setBonus] = useState("")
  const [paymentShare, setPaymentShare] = useState("")

  const selectedTrip = useMemo(() => {
    return trips.find((trip) => trip.id === Number(tripId))
  }, [tripId, trips])

  const selectedDriver = useMemo(() => {
    return drivers.find((driver) => driver.id === Number(driverId))
  }, [driverId, drivers])

  const basePayment = Number(selectedTrip?.routes?.base_payment ?? 0)

  const experienceCoeff = selectedDriver
    ? findCoeffByExperience(selectedDriver.experience_years, experienceRates)
    : null

  const previewPayment =
    basePayment * Number(experienceCoeff ?? 0) * Number(paymentShare || 0) +
    Number(bonus || 0)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!tripId || !driverId || !role || !paymentShare) {
      alert("Заполните все обязательные поля")
      return
    }

    if (Number(paymentShare) <= 0) {
      alert("Доля оплаты должна быть больше 0")
      return
    }

    if (experienceCoeff === null) {
      alert("Для этого стажа не найден коэффициент в таблице experience_rates")
      return
    }

    const driversCount = await getDriversCountForTrip(Number(tripId))
    if (driversCount >= 2) {
      alert("У этого рейса уже назначено 2 водителя")
      return
    }

    const existingAssignments = await getTripDrivers()
    const alreadyExists = existingAssignments.some(
      (item) =>
        Number(item.trip_id) === Number(tripId) &&
        Number(item.driver_id) === Number(driverId)
    )

    if (alreadyExists) {
      alert("Этот водитель уже назначен на выбранный рейс")
      return
    }

    const newTripDriver = {
      trip_id: Number(tripId),
      driver_id: Number(driverId),
      role: role.trim(),
      bonus: Number(bonus || 0),
      experience_coeff: Number(experienceCoeff),
      payment_share: Number(paymentShare),
      calculated_payment: previewPayment,
    }

    await onAdd(newTripDriver)

    setTripId("")
    setDriverId("")
    setRole("")
    setBonus("")
    setPaymentShare("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Назначить водителя на рейс</h3>

      <div style={{ marginBottom: "10px" }}>
        <select value={tripId} onChange={(e) => setTripId(e.target.value)}>
          <option value="">Выберите рейс</option>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              Рейс #{trip.id} — {trip.routes?.name || "Без маршрута"} ({trip.departure_date})
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <select value={driverId} onChange={(e) => setDriverId(e.target.value)}>
          <option value="">Выберите водителя</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.last_name} {driver.first_name} {driver.middle_name}
            </option>
          ))}
        </select>
      </div>

      {selectedDriver && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Стаж:</strong> {selectedDriver.experience_years} лет
        </div>
      )}

      {selectedDriver && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Коэффициент стажа:</strong>{" "}
          {experienceCoeff !== null ? experienceCoeff : "не найден"}
        </div>
      )}

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Номер водителя"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          step="0.01"
          placeholder="Премия"
          value={bonus}
          onChange={(e) => setBonus(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          step="0.01"
          placeholder="Доля оплаты (например, 0.5)"
          value={paymentShare}
          onChange={(e) => setPaymentShare(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <strong>Базовая оплата маршрута:</strong> {basePayment}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <strong>Предварительная итоговая оплата:</strong> {previewPayment}
      </div>

      <button type="submit">Назначить водителя</button>
    </form>
  )
}