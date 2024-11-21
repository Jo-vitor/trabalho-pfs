import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Login from "./view/Login.js";
import Home from "./view/Home.js";
import Cadastro from "./view/Cadastro.js";
import Layout from "./view/Layout.js";
import Reserva from "./view/Reserva.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login/>}/>
          <Route path="cadastro" element={<Cadastro/>}/>
          
          <Route path="/usuario" element={<Layout/>}>
            <Route path="home" element={<Home/>}/>
            <Route path="reservas" element={<Reserva/>}/>
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
