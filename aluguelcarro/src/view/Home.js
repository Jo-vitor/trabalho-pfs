import React, { useState } from "react";
//import { Link } from "react-router-dom";

const Home = () => {
  const [carros, setCarros] = useState([
    {
      id: 1,
      modelo: "HONDA HR-V",
      ano: "2020",
      preco: 255.80,
      image: "https://storagew.mercadorweb.com.br/imagens/veiculos/9/2024/7/honda-hr-v-exl-1-8-flexone-16v-5p-aut-2020-260423-1-sm.jpg",
      alugado: false,
      QuantidadeDias: 0,
    },
    {
      id: 2,
      modelo: "HYUNDAI HB20X",
      ano: "2017",
      preco: 222.00,
      image: "https://storagew.mercadorweb.com.br/imagens/veiculos/71/2024/8/hyundai-hb20x-premium-1-6-flex-16v-aut-2017-260828-2-sm.jpg",
      alugado: false,
      QuantidadeDias: 0,
    },
    {
      id: 3,
      modelo: "CHEVROLET ONIX",
      ano: "2017",
      preco: 222.00,
      image: "https://storagew.mercadorweb.com.br/imagens/veiculos/8/2024/11/chevrolet-onix-hatch-joy-1-0-8v-flex-5p-mec-2019-262309-3-sm.jpg",
      alugado: false,
      QuantidadeDias: 0,
    },
    {
      id: 4,
      modelo: "FORD Ranger",
      ano: "2017",
      preco: 255.00,
      image: "https://storagew.mercadorweb.com.br/imagens/veiculos/54/2024/4/ford-ranger-xlt-3-2-20v-4x4-cd-diesel-aut-2016-259002-1-sm.jpg",
      alugado: false,
      QuantidadeDias: 0,
    },
  ]);
  const atualizarDias = (id, QuantidadeDias) => {
    setCarros(carros.map(car => 
      car.id === id ? { ...car, QuantidadeDias } : car
    ));
  };
  
  const alugarCarro = (id) => {
    const carroSelecionado = carros.find(car => car.id === id);
    if (carroSelecionado.dias < 1) {
      alert("Selecione o número de dias para alugar.");
      return;
    }
  
    setCarros(carros.map(car =>
      car.id === id ? { ...car, alugado: true } : car
    ));
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4" style={{ width: "100%" }}>
      {carros.map(car => (
        <div className="col" key={car.id}>
          <div className="card h-100">
            <img
              src={car.image}
              className="card-img-top"
              alt={car.modelo}
              style={{ opacity: car.alugado ? 0.5 : 1 }} 
            />
            <div className="card-body">
              <h5 className="card-title">{car.modelo}</h5>
              <p className="card-text">{car.ano}</p>
              <p className="card-text">Diária: {car.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
              {car.alugado ? (
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