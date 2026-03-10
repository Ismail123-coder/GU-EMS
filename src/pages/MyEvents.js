import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
export default function MyEvents() {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    API.get("/register/my")
      .then(res => setMyEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>My Registered Events</h2>
      {myEvents.length === 0 && <p>You have not registered for any events yet.</p>}
      {myEvents.map(reg => (
        <div key={reg.id} style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}>
          <h3>{reg.event.title}</h3>
          <p>{reg.event.description}</p>
          <p>Date: {new Date(reg.event.eventDate).toLocaleString()}</p>
          <p>Venue: {reg.event.venue}</p>
          <p>Attendance: {reg.attended ? "Present" : "Not Marked"}</p>
        </div>
      ))}
    </div>
  );
}
