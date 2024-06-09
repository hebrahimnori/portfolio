import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProjectPage from "./pages/ProjectPage";
import PhotoPage from "./pages/PhotoPage";
import SkillPage from "./pages/SkillPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/skills" element={<SkillPage />} />
      <Route path="/photography" element={<PhotoPage />} />
    </Routes>
  );
}

export default App;
