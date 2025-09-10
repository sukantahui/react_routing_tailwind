import { NavLink } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./routes/Navbar";

export default function App() {
  console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
  return (
    <div className="">
      {/* Render Navigation Bar */}
      <NavBar />

      {/* Render App Routes */}
      <AppRoutes />
    </div>
  );
}
