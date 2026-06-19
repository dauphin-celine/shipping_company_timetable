import { useState } from "react"
import RoutesPage from "./pages/RoutesPage"
import DriversPage from "./pages/DriversPage"
import TripsPage from "./pages/TripsPage"
import TripDriversPage from "./pages/TripDriversPage"

function App() {
  const [currentPage, setCurrentPage] = useState("routes")

  return (
    <div>
      <h1>Система учета грузоперевозок</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setCurrentPage("routes")}>Маршруты</button>
        <button onClick={() => setCurrentPage("drivers")}>Водители</button>
        <button onClick={() => setCurrentPage("trips")}>Рейсы</button>
        <button onClick={() => setCurrentPage("tripDrivers")}>Расчет выплат</button>
      </div>

      {currentPage === "routes" && <RoutesPage />}
      {currentPage === "drivers" && <DriversPage />}
      {currentPage === "trips" && <TripsPage />}
      {currentPage === "tripDrivers" && <TripDriversPage />}
    </div>
  )
}

export default App