import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await api.get("/events/approved");
      setEvents(res.data);
    } catch (err) {
      alert("Failed to load events");
    }
  };

  return (
    <div>
      <h2>Approved Events</h2>

      {events.length === 0 && <p>No events found</p>}

      {events.map((event) => (
        <div key={event.id}>
          <h4>{event.title}</h4>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}
