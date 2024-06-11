import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProjectPage from "./pages/ProjectPage";
import PhotoPage from "./pages/PhotoPage";
import AboutMe from "./pages/AboutMe";
import PageNotFound from "./pages/404";
import ProjectsDetail from "./pages/ProjectsDetail";
import Layout from "./layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index path="/" element={<MainPage />} replace />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:id" element={<ProjectsDetail />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/photography" element={<PhotoPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
