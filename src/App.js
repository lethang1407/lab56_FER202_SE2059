import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Sysllabus from "./pages/Sysllabus";
import SubjectDetail from "./pages/SubjectDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sysllabus" element={<Sysllabus />} />
        <Route path="/subject/:id" element={<SubjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;