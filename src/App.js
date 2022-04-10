import { Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cadastro" element={<Cadastro />} />
      </Routes>
    </div>
  );
}

export default App;
