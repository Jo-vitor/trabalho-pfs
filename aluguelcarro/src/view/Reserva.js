import axios from "axios";
import React, { useEffect, useState } from "react";


const CarrosAlugados = () => {

  const [objetos, setObjetos] = useState(null);


  const carregarDados = () => {
    axios.get('http://localhost:5146/reservas').then(resp => {
      setObjetos(resp.data);
    }).catch(erro => { console.log(erro) })
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (!objetos) {
    return <div>Carregando...</div>
  }


  const cancelarAluguel = (id) => {
    const carroSelecionado = objetos.find(car => car.id === id);


    axios.delete(`http://localhost:5146/reservas/${id}`).then(() => {
      setObjetos(objetos.filter(reserva => reserva.id !== id));
    })

    axios.put(`http://localhost:5146/carros/${id}`, {
      ...carroSelecionado,
      reservado: false
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
                  <h5 className="card-title">{reserva.carro.ano}</h5>
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