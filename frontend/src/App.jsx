import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import Notebook from "./pages/Chapter";
import NotebookPage from "./pages/NotebookPage";
import Profile from "./pages/profile";
import MainLayout from "./components/MainLayout";
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chapter/:id" element={<Notebook />} />
        <Route path="/notebook/:notebookId" element={<NotebookPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Landing />} />

    </Routes>
  );
}

export default App;