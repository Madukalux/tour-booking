import { useState } from "react";
import api from "../api";

export default function CreateBooking() {
  const [form, setForm] = useState({
    packageId: "SIGIRIYA_DAY",
    startDate: "",
    numPeople: 1,
  });
  const [okMsg, setOkMsg] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError(""); 
    setOkMsg("");
    try {
      await api.post("/api/bookings", form);
      setOkMsg("Booking created successfully ✅");
      // optional: reset form
      // setForm({ packageId: "SIGIRIYA_DAY", startDate: "", numPeople: 1 });
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="card">
      <h2>Create Booking</h2>
      <form onSubmit={submit} className="form">
        <input
          placeholder="Package ID"
          value={form.packageId}
          onChange={(e) => setForm({ ...form, packageId: e.target.value })}
        />
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        />
        <input
          type="number"
          min={1}
          value={form.numPeople}
          onChange={(e) => setForm({ ...form, numPeople: Number(e.target.value) })}
        />
        <button>Create</button>
      </form>

      {okMsg && <p className="ok">{okMsg}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
