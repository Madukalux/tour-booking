import { Link, NavLink, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Me from "./pages/Me.jsx";
import CreateBooking from "./pages/CreateBooking.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Packages from "./pages/Packages.jsx";
import { useAuth } from "./AuthContext.jsx";

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { token, logout } = useAuth();     // use token instead of user
  const nav = useNavigate();

  function doLogout() {
    logout();                               // clears token + user
    nav("/login");                          // redirect to login
  }

  return (
    <div className="app">
      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/packages">Packages</NavLink>
        <NavLink to="/book">Book</NavLink>
        <NavLink to="/bookings">My Bookings</NavLink>
        <NavLink to="/me">Me</NavLink>

        <span style={{ marginLeft: "auto" }} />

        {!token ? (
          <NavLink to="/login">Login</NavLink>
        ) : (
          <button onClick={doLogout} className="btn-logout">Logout</button>
        )}
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<Protected><CreateBooking /></Protected>} />
          <Route path="/bookings" element={<Protected><MyBookings /></Protected>} />
          <Route path="/me" element={<Protected><Me /></Protected>} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Tour Booking Demo</h1>
      <p>Register or Login, then create a booking and view “My Bookings”.</p>
      <p><Link to="/register">Register</Link> • <Link to="/login">Login</Link></p>
    </div>
  );
}
