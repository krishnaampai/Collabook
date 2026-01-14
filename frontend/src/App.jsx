import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/Login";
import Explore from "./pages/Explore";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
  );
}

export default App;

