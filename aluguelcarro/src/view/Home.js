import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import { Link } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const [objetos, setObjetos] = useState(null);

  const carregarDados = () => {
    axios.get('http://localhost:5146/carros').then(resp => {
      setObjetos(resp.data);
    }).catch(erro => { console.log(erro) })
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (!objetos) {
    return <div>Carregando...</div>
  }

  if (objetos.length === 0) {
    return (
      <>
        <h2>Carros para alugar</h2>
        <p>Nenhum carro para alugar.</p>
      </>
    )
  }

  const atualizarDias = (id, QuantidadeDias) => {
    setObjetos(objetos.map(car =>
      car.id === id ? { ...car, QuantidadeDias } : car
    ));
  };

  const alugarCarro = (id) => {
    const carroSelecionado = objetos.find(car => car.id === id);

    if (!carroSelecionado.QuantidadeDias || carroSelecionado.QuantidadeDias < 1) {
      alert("Selecione o número de dias para alugar.");
      return;
    }

    const reserva = {
      carro: { id: carroSelecionado.id },
      quantidadeDias: carroSelecionado.QuantidadeDias,
      valorTotal: carroSelecionado.preco * carroSelecionado.QuantidadeDias,
      dataInicio: new Date().toISOString(),
    };

    axios.post("http://localhost:5146/reservas", reserva).then(() => {
      navigate("/usuario/reservas")
    })
    axios.put(`http://localhost:5146/carros/${id}`, {
      ...carroSelecionado,
      reservado: true
    })
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4" style={{ width: "100%" }}>
      {objetos.map(car => (
        <div className="col" key={car.id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{car.modelo}</h5>
              <h8 className="card-title">Ano: {car.ano}</h8>
              <p className="card-text">Diária: {car.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
              {car.reservado ? (
                <button type="button" className="btn btn-secondary" disabled>
                  Alugado
                </button>
              ) : (
                <>
                  <label htmlFor={`dias-${car.id}`} className="form-label">Quantidade de dias</label>
                  <input
                    type="number"
                    className="form-control"
                    id={`dias-${car.id}`}
                    min="0"
                    value={car.QuantidadeDias}
                    onChange={(e) => atualizarDias(car.id, parseInt(e.target.value) || 0)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => alugarCarro(car.id)}
                    disabled={car.QuantidadeDias < 1}
                  >
                    Alugar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;