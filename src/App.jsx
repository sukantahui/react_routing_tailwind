import { NavLink } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./routes/Navbar";

export default function App() {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      {/* Render Navigation Bar */}
      <NavBar />

      {/* Render App Routes */}
      <AppRoutes />
    </div>
  );
}
