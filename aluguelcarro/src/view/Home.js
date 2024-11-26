import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//import { Link } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const [objetos, setObjetos] = useState(null);
  var idUsuario = localStorage.getItem('usuario-id');


  const carregarDados = () => {
    axios.get('http://localhost:5146/carros', { withCredentials: true }).then(resp => {
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

    // const reserva = {
    //   carro: { id: carroSelecionado.id },
    //   usuario: { id: idUsuario },
    //   quantidadeDias: carroSelecionado.QuantidadeDias,
    //   valorTotal: carroSelecionado.preco * carroSelecionado.QuantidadeDias,
    //   dataInicio: new Date().toISOString(),
    // };
    
    const reserva = {
      dataInicio: new Date().toISOString(),
      quantidadeDias: carroSelecionado.QuantidadeDias,
      valorTotal: carroSelecionado.preco * carroSelecionado.QuantidadeDias,
      carro: {
        id: carroSelecionado.id,
        modelo: carroSelecionado.modelo,
        ano: carroSelecionado.ano,
        preco: carroSelecionado.preco,
        reservado: true
      },
      usuario: {
        id: idUsuario
      }
    };

    axios.post("http://localhost:5146/reservas", reserva, { withCredentials: true }).then(() => {
      navigate("/usuario/reservas");
    }).catch(erro => { console.log(erro) })

    axios.put(`http://localhost:5146/carros/${id}`, {
      ...carroSelecionado,
      reservado: true
    }, { withCredentials: true }).catch(erro => { console.log(erro) })

  };

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{ width: "100%" }}>
        {objetos.map(car => (
          <div className="col" key={car.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{car.modelo}</h5>
                <p className="card-title">Ano: {car.ano}</p>
                <p className="card-text">Diária: R${car.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
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
                      className="btn btn-primary mt-3"
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
    </div>
  );
};

export default Home;