import "./EventCard.css";
import API from "../api";

export default function EventCard({ event }) {
  const register = async () => {
    await API.post(`/register/${event.id}`);
    alert("Registered successfully");
  };

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <span>📍 {event.venue}</span>
      <span>📅 {new Date(event.eventDate).toLocaleString()}</span>
      <button onClick={register}>Register</button>
    </div>
  );
}
