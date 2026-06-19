// useState из React для хранения состояния
import { useState } from "react"

// Функциональный компонент формы добавления водителя
// Принимает функцию, которая будет вызвана при добавлении
export default function DriverForm({ onAdd }) {
  // Состояния для хранения значений полей формы
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [experienceYears, setExperienceYears] = useState("")
// Обработчик отправки формы
  async function handleSubmit(e) {
    e.preventDefault() // предотвращаем перезагрузку страницы

    if (!lastName || !firstName || !middleName || !experienceYears) {
      alert("Не заполнены поля")
      return
    }
// Формируем объект нового водителя
    const newDriver = {
      // trim - убрать пробелы по краям
      last_name: lastName.trim(),
      first_name: firstName.trim(),
      middle_name: middleName.trim(),
      experience_years: Number(experienceYears), // преобразовать в число
    }
// вызов переданной функции
    await onAdd(newDriver)
// очистка формы после успешного добавления
    setLastName("")
    setFirstName("")
    setMiddleName("")
    setExperienceYears("")
  }
// JSX-разметка формы
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Добавить водителя</h3>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Отчество"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Стаж (лет)"
          value={experienceYears}
          onChange={(e) => setExperienceYears(e.target.value)}
        />
      </div>

      <button type="submit">Добавить водителя</button>
    </form>
  )
}