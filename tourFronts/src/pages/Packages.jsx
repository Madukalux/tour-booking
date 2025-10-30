// src/pages/Packages.jsx
import { useState } from "react";

const PACKAGES = [
  {
    id: "SIGIRIYA_DAY",
    title: "Sigiriya Day Tour",
    subtitle: "Lions Rock + Dambulla Cave Temple",
    days: 1,
    price: 75,
    img: "/pk-sigiriya.jpg",
  },
  {
    id: "ELLA_2D",
    title: "Ella 2-Day Escape",
    subtitle: "Nine Arches Bridge • Little Adam’s Peak",
    days: 2,
    price: 220,
    img: "/pk-ella.jpg",
  },
  {
    id: "KANDY_1D",
    title: "Kandy Cultural Day Trip",
    subtitle: "Temple of the Tooth • Botanical Gardens",
    days: 1,
    price: 120,
    img: "/pk-kandy.jpg",
  },
  {
    id: "SOUTH_COAST_3D",
    title: "South Coast Sun & Surf",
    subtitle: "Galle • Unawatuna • Mirissa",
    days: 3,
    price: 340,
    img: "/pk-southcoast.jpg",
  },
  {
    id: "WILDLIFE_2D",
    title: "Wildlife & Safari",
    subtitle: "Yala or Udawalawe National Park",
    days: 2,
    price: 280,
    img: "/pk-wildlife.jpg",
  },
];

export default function Packages() {
  const [copied, setCopied] = useState("");

  const copyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(id);
      setTimeout(() => setCopied(""), 1600);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div>
      <h2>Packages</h2>
      <ul className="pkg-list">
        {PACKAGES.map((p) => (
          <li key={p.id} className="pkg-item">
            <div className="pkg-thumb" style={{ backgroundImage: `url(${p.img})` }} />
            <div className="pkg-meta">
              <div className="pkg-title-row">
                <h3 className="pkg-title">{p.title}</h3>
                <span className="pkg-days">{p.days}d</span>
              </div>
              <p className="pkg-sub">{p.subtitle}</p>
              <div className="pkg-foot">
                <span className="pkg-price">${p.price}</span>
                <code className="pkg-id">{p.id}</code>
                <button className="pkg-btn" onClick={() => copyId(p.id)}>
                  {copied === p.id ? "Copied ✓" : "Use this package"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 10 }}>
        Tip: Click <b>Use this package</b> to copy the <code>packageId</code>, then paste it on the <b>Book</b> page.
      </p>
    </div>
  );
}
