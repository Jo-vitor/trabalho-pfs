import React, { useState } from "react";


const CarrosAlugados = () => {
  
  const [carrosAlugados, setCarrosAlugados] = useState([
    {
      id: 1,
      title: "HONDA HR-V",
      description: "EXL 1.8 FLEXONE 16V 5P AUT. 2020",
      price: "500,00",
      image: "https://storagew.mercadorweb.com.br/imagens/veiculos/9/2024/7/honda-hr-v-exl-1-8-flexone-16v-5p-aut-2020-260423-1-sm.jpg",
    },
    {
      id: 2,
      title: "HYUNDAI HB20X",
      description: "2017",
      price: "500,00",
      image: "https://storagew.mercadorweb.com.br/imagens/veiculos/71/2024/8/hyundai-hb20x-premium-1-6-flex-16v-aut-2017-260828-2-sm.jpg",
    },
    
  ]);

  
  const cancelarAluguel = (id) => {
    const novosCarros = carrosAlugados.filter(car => car.id !== id);
    setCarrosAlugados(novosCarros);
    alert("Aluguel cancelado com sucesso!");
  };

  return (
    <div className="container mt-5">
      <h2>Carros Alugados</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {carrosAlugados.length === 0 ? (
          <p>Nenhum carro alugado.</p>
        ) : (
          carrosAlugados.map(car => (
            <div className="col" key={car.id}>
              <div className="card h-100">
                <img src={car.image} className="card-img-top" alt={car.title} />
                <div className="card-body">
                  <h5 className="card-title">{car.title}</h5>
                  <p className="card-text">{car.description}</p>
                  <p className="card-text">Valor da locação (dia): R${car.price}</p>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => cancelarAluguel(car.id)}
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