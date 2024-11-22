import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const EditarCarro = () => {
  const [objeto, setObjeto] = useState(
    {id: "", modelo: "", preco: 0}
  )

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5146/carros/${id}`).then(resp => {
      setObjeto(resp.data);
    })
  }, [id]);

  const atualizarCampo = (nome, valor) => {
    let objNovo = { ...objeto };
    objNovo[nome] = valor;
    setObjeto(objNovo);
  }

  const salvar = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5146/carros/${id}`, objeto);
  }

  return (
    <form>
      <div className="container mt-5">
        <h1>Editar Carro</h1>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Modelo</label>
          <input
            type="text"
            className="form-control"
            value={objeto.modelo}
            onChange={e => atualizarCampo('modelo', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Valor da Diária</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={objeto.preco}
            onChange={e => atualizarCampo('preco', e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={e => salvar(e)}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default EditarCarro;