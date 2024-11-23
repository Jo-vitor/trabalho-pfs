import React, { useState } from "react"

const Locacao = () => {
  const [diasTotal, setDiasTotal] = useState();

  return (
    <div className="container mt-5">
      <h2>Checkout de Aluguel de Carro</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">ddd</h5>
          <p className="card-text">ddd</p>
          <p className="card-text">Valor da locação (dia): R$500,00</p>
        </div>
      </div>
      <div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">Quantidade de dias</label>
          <input
            type="number"
            className="form-control"
            id="endDate"
            min="1"
            value={diasTotal}
            onChange={(e) => setDiasTotal()}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Confirmar Aluguel</button>
      </div>
    </div>
  )
};

export default Locacao;