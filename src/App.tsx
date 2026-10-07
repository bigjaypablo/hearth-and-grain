import { lazy, useCallback, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "./components/layout/SmoothScroll";
import Preloader from "./components/layout/Preloader";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useReducedMotion } from "./hooks/useReducedMotion";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));

const SEEN_KEY = "hg-preloader-seen";

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState<boolean>(() => reduced || alreadySeen());

  const handleDone = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage unavailable, ignore */
    }
    setReady(true);
  }, []);

  return (
    <SmoothScroll>
      <AnimatePresence>
        {!ready && <Preloader key="preloader" onDone={handleDone} />}
      </AnimatePresence>

      {ready && (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </SmoothScroll>
  );
}
