import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const CarrosAlugados = () => {
  
  const navigate = useNavigate();
  const [objetos, setObjetos] = useState(null);


  const carregarDados = () => {
    axios.get('http://localhost:5146/reservas', { withCredentials: true }).then(resp => {
      setObjetos(resp.data);
    }).catch(erro => { console.log(erro) })
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (!objetos) {
    return <div>Carregando...</div>
  }

  
  const cancelarAluguel = (idReserva) => {
    const reservaSelecionada= objetos.find(reserva => reserva.id === idReserva);


    axios.delete(`http://localhost:5146/reservas/${idReserva}`, { withCredentials: true })
    .then(() => {
      axios.put(`http://localhost:5146/carros/${reservaSelecionada.carro.id}`, {
        ...reservaSelecionada.carro,
        reservado: false
      }, { withCredentials: true });
    }).then(() => {
      setObjetos(objetos.filter(reserva => reserva.id !== idReserva));
      alert("Aluguel cancelado com sucesso!");
    })
  };

  return (
    <div className="container mt-5">
      <h2>Carros Alugados</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {objetos.length === 0 ? (
          <p>Nenhum carro alugado.</p>
        ) : (
          objetos.map(reserva => (
            <div className="col" key={reserva.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{reserva.carro.modelo}</h5>
                  <p className="card-text">{reserva.carro.ano}</p>
                  <p className="card-text"><b>{reserva.usuario.nome}</b></p>
                  <p className="card-text">Dias Alugados: {reserva.quantidadeDias}</p>
                  <p className="card-text">Valor total da locação: R${reserva.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => cancelarAluguel(reserva.id)}
                  >
                    Cancelar Aluguel
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarrosAlugados;