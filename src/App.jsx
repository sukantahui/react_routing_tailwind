import { NavLink } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import NavBar from "./routes/Navbar";

export default function App() {
  return (
    <div className="">
      {/* Render Navigation Bar */}
      <NavBar />

      {/* Render App Routes */}
      <AppRoutes />
    </div>
  );
}
