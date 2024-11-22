import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Login from "./view/Login.js";
import Home from "./view/Home.js";
import HomeAdm from "./view/HomeAdm.js";
import Cadastro from "./view/Cadastro.js";
import Layout from "./view/Layout.js";
import Reserva from "./view/Reserva.js";
import ReservaAdm from "./view/ReservaAdm.js";
import Locacao from "./view/Locacao.js";
import InserirCarro from "./view/InserirCarro.js";
import EditarCarro from "./view/EditarCarro.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login/>}/>
          <Route path="cadastro" element={<Cadastro/>}/>
          
          <Route path="/usuario" element={<Layout/>}>
            <Route path="home" element={<Home/>}/>
            <Route path="reservas" element={<Reserva/>}/>
            <Route path="locacao" element={<Locacao/>}/>
          </Route>

          <Route path="/adm" element={<Layout/>}>
            <Route path="home" element={<HomeAdm/>}/>
            <Route path="reservas" element={<ReservaAdm/>}/>
            <Route path="inserir" element={<InserirCarro/>} />
            <Route path="editar/:id" element={<EditarCarro/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
