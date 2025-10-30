import { useEffect, useState } from "react";
import api from "../api";

function isoOnly(dateLike) {
  // ensures YYYY-MM-DD for <input type="date">
  if (!dateLike) return "";
  return String(dateLike).slice(0, 10);
}

export default function MyBookings() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // edit state
  const [edit, setEdit] = useState(null); // { id, startDate, numPeople }

  const BTN = {
    base: {
      appearance: "none",
      border: 0,
      borderRadius: 10,
      padding: "6px 10px",
      marginRight: 8,
      cursor: "pointer",
      color: "#fff",
    },
    primary: { background: "#2563eb" },   // blue
    danger:  { background: "#dc2626" },   // red
    neutral: { background: "#6b7280" },   // gray
    disabled:{ opacity: 0.6, cursor: "not-allowed" },
  };

  async function load() {
    setError("");
    try {
      const { data } = await api.get("/api/bookings/me");
      setRows(data);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!window.confirm("Delete this booking?")) return;
    setError("");
    try {
      await api.delete(`/api/bookings/${id}`);
      setRows((r) => r.filter((x) => x.id !== id));
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    }
  }

  function beginEdit(b) {
    setEdit({
      id: b.id,
      startDate: isoOnly(b.startDate),
      numPeople: b.numPeople,
    });
  }

  function cancelEdit() {
    setEdit(null);
  }

  async function saveEdit() {
    if (!edit) return;
    setSaving(true);
    setError("");
    try {
      await api.put(`/api/bookings/${edit.id}`, {
        startDate: edit.startDate,                // backend expects ISO date string
        numPeople: Number(edit.numPeople),
      });
      // reflect the change locally
      setRows((r) =>
        r.map((x) =>
          x.id === edit.id
            ? { ...x, startDate: edit.startDate, numPeople: Number(edit.numPeople) }
            : x
        )
      );
      setEdit(null);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card card--frost">
      <h2 style={{ marginTop: 0 }}>My Bookings</h2>

      {error && <p className="error">{error}</p>}

      {rows.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="tbl tbl--profile">
          <thead>
            <tr>
              <th style={{ width: "28%" }}>Id</th>
              <th style={{ width: "20%" }}>Package</th>
              <th style={{ width: "16%" }}>Date</th>
              <th style={{ width: "10%" }}>People</th>
              <th style={{ width: "16%" }}>Status</th>
              <th style={{ width: "10%" }} aria-label="actions"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((b) => {
              const isEditing = edit?.id === b.id;
              return (
                <tr key={b.id}>
                  <td><code>{b.id}</code></td>
                  <td>{b.packageId}</td>

                  {/* Date cell */}
                  <td>
                    {isEditing ? (
                      <input
                        type="date"
                        value={edit.startDate}
                        onChange={(e) =>
                          setEdit((s) => ({ ...s, startDate: e.target.value }))
                        }
                      />
                    ) : (
                      isoOnly(b.startDate)
                    )}
                  </td>

                  {/* People cell */}
                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        min={1}
                        value={edit.numPeople}
                        onChange={(e) =>
                          setEdit((s) => ({ ...s, numPeople: e.target.value }))
                        }
                        style={{ width: 80 }}
                      />
                    ) : (
                      b.numPeople
                    )}
                  </td>

                  <td>{b.status}</td>

                  {/* Actions */}
                  <td style={{ whiteSpace: "nowrap" }}>
                    {!isEditing ? (
                      <>
                        <button
                          style={{ ...BTN.base, ...BTN.primary }}
                          onClick={() => beginEdit(b)}
                          title="Edit booking"
                        >
                          Edit
                        </button>

                        <button
                          style={{ ...BTN.base, ...BTN.danger }}
                          onClick={() => remove(b.id)}
                          title="Delete booking"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          style={{ ...BTN.base, ...BTN.primary, ...(saving ? BTN.disabled : {}) }}
                          onClick={saveEdit}
                          disabled={saving}
                          title="Save changes"
                        >
                          {saving ? "Saving…" : "Save"}
                        </button>

                        <button
                          style={{ ...BTN.base, ...BTN.neutral }}
                          onClick={cancelEdit}
                          title="Cancel editing"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
