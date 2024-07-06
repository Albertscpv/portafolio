import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage.tsx"
import WorkPage from "./pages/WorkPage"
import ContactPage from "./pages/ContactPage"
import ProjectPage from "./pages/ProjectPage"
import DesignsPage from "./pages/DesignsPage.tsx";

function App() {
  return (
    <>
    <Router>
      <main className="min-h-screen">
        <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/projects" element={<ProjectPage/>}/>
        <Route path="/work" element={<WorkPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/designs" element={<DesignsPage/>}/>
      </Routes>
      </main>
      <Footer/>
    </Router>
    </>
  )
}

export default App
