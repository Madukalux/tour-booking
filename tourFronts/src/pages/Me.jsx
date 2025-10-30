import { useEffect, useState } from "react";
import api from "../api";

export default function Me() {
  const [me, setMe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/users/me");
        // Safeguard: never show password even if backend sends it
        const { id, name, email, role } = data || {};
        setMe({ id, name, email, role });
      } catch (e) {
        setError(e.response?.data?.error || e.message);
      }
    })();
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!me) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>My Profile</h2>
      <table className="tbl">
        <tbody>
          <tr><th style={{width: 160}}>Name</th><td>{me.name}</td></tr>
          <tr><th>Email</th><td>{me.email}</td></tr>
          <tr><th>Role</th><td>{me.role || "USER"}</td></tr>
          <tr><th>User ID</th><td><code>{me.id}</code></td></tr>
        </tbody>
      </table>
    </div>
  );
}
