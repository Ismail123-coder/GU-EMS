import { useEffect, useState } from "react";
import axios from "../api";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axios.get("/admin/pending-users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setUsers(res.data);
  };

  const approveUser = async (id) => {
    await axios.post(`/admin/approve-user/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Pending Users</h2>
      {users.map(u => (
        <div key={u.id}>
          {u.name} ({u.email})
          <button onClick={() => approveUser(u.id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}
