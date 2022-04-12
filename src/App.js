import { Route, Routes } from "react-router-dom";
import Configuracoes from "./pages/Configuracoes";
import Home from "./pages/Home";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Routes>
    </div>
  );
}

export default App;
