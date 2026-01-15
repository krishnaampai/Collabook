import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import Notebook from "./pages/Chapter";
import NotebookPage from "./pages/NotebookPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/notebook" element={<Notebook />} />
      <Route path="/profile" element={<Profile />} />


      <Route path="/chapter/:id" element={<Notebook />} />
      <Route path="/notebook/:notebookId" element={<NotebookPage />} />

    </Routes>
  );
}

export default App;